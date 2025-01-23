import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IndexedDbService } from 'src/app/services/indexed-db.service';

@Injectable({
  providedIn: 'root',
})
export class GithubService {

  private baseUrl = 'https://github-contributions-api.jogruber.de/v4/'; // Base URL for the GitHub contributions API.
  private storeName = 'Contributions';  // The name of the object store in the database

  constructor(private indexedDbService: IndexedDbService) { }


  /**
   * Retrieves contributions for the provided GitHub username.
   * @param username - The GitHub username for which contributions data is to be fetched.
   * @returns An observable that emits the contributions data. If the data is already in IndexedDB, 
   * it will emit that data. If not, it will fetch the data from the API, store it, and then emit it.
   */
  getContributions(username: string): Observable<any> {
    return new Observable(observer => {
      // fetching the contribution data from storage
      this.indexedDbService.getItem('contributions', this.storeName)
        .then(async (contributionData) => {
          if (contributionData) {
            // If data exists in storage, emit it to the observer
            observer.next(contributionData);  // Emit the contribution data to the observer
            observer.complete();  // Complete the observable stream
          } else {
            // If no data in storage, fetch from the API and save to storage
            const apiUrl = `${this.baseUrl}${username}?y=last`;

            try {
              // Fetch the contributions from the API
              const response = await fetch(apiUrl);

              if (!response.ok) {
                throw new Error('Failed to fetch data from the server');
              }

              const contributions = await response.json();  // Parse the JSON response
              await this.indexedDbService.saveItem('contributions', contributions, this.storeName);  // Save the contributions in storage

              // Emit the contribution data to the observer
              observer.next(contributions);
              observer.complete();  // Complete the observable stream
            } catch (error: any) {
              // Handle any errors that occur during the fetch or save operation
              console.error("Error occurred during operation: ", error);
              observer.error(error);
            }
          }
        }).catch(error => {
          // Handle any errors in retrieving data from storage
          console.error("Error occurred in getContributions: ", error);
          observer.error(error);
        });
    });
  }

}
