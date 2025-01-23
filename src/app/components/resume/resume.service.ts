import { Injectable } from '@angular/core';
import { IndexedDbService } from 'src/app/services/indexed-db.service';

@Injectable({
    providedIn: 'root',
})
export class ResumeService {

    private storeName = 'ResumeStore';  // The name of the object store within the database

    constructor(private indexedDbService: IndexedDbService) { }


    /**
     * Asynchronously loads the PDF and image files.
     * - Checks if the files are available in IndexedDB via `indexedDbService`.
     * - If not available, fetches the files from the remote URL and stores them in IndexedDB.
     * - Creates object URLs for the loaded files to be used in the component.
     * @param key - The key to store/retrieve the file in IndexedDB.
     * @returns A Promise that resolves with the object URL of the file.
     */
    async loadFile(key: string, fileUrl: string): Promise<string> {
        try {
            // Ensure Key and fileUrl are valid
            if (!key?.trim() || !fileUrl?.trim()) {
                throw new Error('Key or File URL is not defined or empty');
            }
            // Check if the file exists in IndexedDB
            const fileBlob = await this.indexedDbService.getItem(key, this.storeName);

            if (fileBlob) {
                // Return the object URL if the file exists
                return URL.createObjectURL(fileBlob);
            }

            // Fetch the file from the remote URL
            const response = await fetch(fileUrl);
            const fileBlobFetched = await response.blob();

            // Save the file in IndexedDB
            await this.indexedDbService.saveItem(key, fileBlobFetched, this.storeName);

            // Return the object URL for the fetched file
            return URL.createObjectURL(fileBlobFetched);
        } catch (error) {
            console.error(`Error loading file [${key}]:`, error);
            throw error;
        }
    }
}
