import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreLoaderService {
  // to track loading state (true or false)
  private loadingSubject = new BehaviorSubject<boolean>(false);

  // Observable to expose loading state to other components
  isLoading$ = this.loadingSubject.asObservable();

  // Method to show the loader (sets loading state to true)
  show() {
    this.loadingSubject.next(true);
    // console.log('show >> Current state:', this.loadingSubject.getValue());
  }

  // Method to hide the loader (sets loading state to false)
  hide() {
    this.loadingSubject.next(false);
    // console.log('hide >> Current state:', this.loadingSubject.getValue());
  }

}
