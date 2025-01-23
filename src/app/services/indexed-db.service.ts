import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private dbName = 'PortfolioDB';  // The name of the IndexedDB database
  private storeNames: string[] = [
    'Contributions', 'ResumeStore'
  ];  // List of object store names to be created in the database


  //Public method to initialize the database.
  initialize(): void {
    this.initDB();
  }

  //Initializes the IndexedDB database by creating object stores if they don't already exist.
  private initDB(): void {
    const request = indexedDB.open(this.dbName, 1); // Open the database with version 1

    /**
     * Triggered when the database version is upgraded or newly created.
     * Ensures all required object stores are created.
     */
    request.onupgradeneeded = (event: any) => {
      const db = event.target.result; // Get a reference to the database
      // Create object stores if they don't exist
      this.storeNames.forEach((storeName) => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName); // Create a new object store
          // console.log(`Created object store: ${storeName}`); // Log the creation of the store
        }
      });
    };

    // Triggered if an error occurs while opening the database.
    request.onerror = (error) => {
      console.error('Error initializing database:', error); // Log any errors during initialization
    };
  }


  /**
   * Retrieves a data from the IndexedDB store using the provided key.
   * @param key - The unique key used to identify the data in the object store
   * @param storeName - Name of the object store where the data is stored
   * @returns A Promise resolving with the data (Blob) or null if not found
   */
  getItem(key: string, storeName: string): Promise<Blob | null> {
    // console.log(`getItem >> key: ${key} | storeName: ${storeName}`);
    return new Promise((resolve, reject) => {

      try {
        const request = indexedDB.open(this.dbName);  // Open the database

        /**
         * Triggered when the database is successfully opened.
         * Initiates a transaction to retrieve the data.
         */
        request.onsuccess = (event: any) => {
          const db = event.target.result;
          //const db = (event.target as IDBRequest).result;

          const objectStores = db.objectStoreNames;
          if (objectStores.length == 0) {
            //console.warn("Object stores not found");
            this.deleteDatabase()
              .then(() => this.initDB())    // initialize database
              .catch((error) => console.error("Database deletion failed:", error));
          }

          const transaction = db.transaction(storeName, 'readonly');  // Transaction with 'readonly' permission
          const store = transaction.objectStore(storeName);  // Access the object store
          const getRequest = store.get(key);  // Retrieve the data using the provided key

          // Resolve the promise with the retrieved data on success
          getRequest.onsuccess = (event: any) => resolve(event.target.result);

          // Reject the promise on retrieval error
          getRequest.onerror = (error: any) => reject(error);
        }
      }
      catch (error: any) {
        //console.error('Unexpected error during getItem operation:', error);
        reject(error);
      }
    });
  }


  /**
   * Saves a data in the IndexedDB store.
   * @param key - Unique identifier for the data in the object store
   * @param data - The data (Blob) to be stored in the IndexedDB
   * @param storeName - Name of the object store where the data is to be saved
   * @returns A Promise resolving on successful save or rejecting with an error
   */
  saveItem(key: string, data: Blob, storeName: string): Promise<void> {
    // console.log(`saveItem >> key : ${key} | storeName : ${storeName}`);
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName);  // Open the database

      // Starts a transaction and stores the data.
      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction(storeName, 'readwrite');  // Transaction with 'readwrite' permission
        const store = transaction.objectStore(storeName);  // Access the object store
        const saveRequest = store.put(data, key);  // Save the data with the provided key

        // Resolve the promise when the data is saved successfully
        saveRequest.onsuccess = () => resolve();

        // Reject the promise if an error occurs during save
        saveRequest.onerror = (error: any) => reject(error);
      };

      // Reject the promise if the database fails to open
      request.onerror = (error) => reject(error);
    });
  }


  /**
   * Deletes the IndexedDB database.
   * @returns A Promise that resolves when the database is successfully deleted, or rejects if an error occurs.
   */
  private deleteDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase(this.dbName); // Request to delete the database

      // Resolves the promise when the database is successfully deleted
      request.onsuccess = () => {
        console.log("Database deleted successfully"); // Log success message
        resolve(true);
      };

      // Rejects the promise if an error occurs while deleting the database
      request.onerror = (error: any) => {
        console.error("Error deleting database:", error); // Log error details
        reject(error);
      };
    });
  }


  /**
   * Attaches an event listener to clear the data when the tab is closed.
   * This function ensures that the stored data is cleared when the user leaves the page.
   */
  attachClearDataOnTabClose() {
    window.onbeforeunload = () => {
      // Clear the data when the tab is about to close
      this.deleteDatabase()
        .then(() => console.log("Database deletion complete."))
        .catch((error) => console.error("Database deletion failed:", error));
    };
  }
}
