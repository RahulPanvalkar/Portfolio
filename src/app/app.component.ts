import { ChangeDetectorRef, Component } from '@angular/core';
import { PreLoaderService } from './services/pre-loader.service';
import { StarfieldService } from './services/starfield.service';
import { IndexedDbService } from 'src/app/services/indexed-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Portfolio'; // Application title
  isLoading = this.preLoaderService.isLoading$; // Observable for loading state, provided by PreLoaderService.

  // Injecting the PreLoaderService to manage the loader state
  // Injecting ChangeDetectorRef to manually trigger change detection
  constructor(
    private starfieldService: StarfieldService,
    private preLoaderService: PreLoaderService,
    private cdr: ChangeDetectorRef,
    private indexedDbService: IndexedDbService) { }

  ngOnInit(): void {
    this.preLoader();
    this.starfieldService.init(); // Initialize the starfield animation
    this.indexedDbService.initialize();  // Initialize FileStorageService
    this.indexedDbService.attachClearDataOnTabClose(); // Ensure data is cleared from storage when the tab is closed.
  }

  // Lifecycle hook that runs after every change detection cycle.
  // Used here to explicitly trigger change detection when needed.
  ngAfterViewChecked(): void {
    // Manually triggers change detection to ensure any changes are reflected in the view.
    this.cdr.detectChanges();
  }

  // Handles preloader visibility with a delay
  preLoader() {
    this.preLoaderService.show(); // Show the loader
    setTimeout(() => {
      this.preLoaderService.hide(); // Hide the loader after 1.5 seconds
      this.cdr.detectChanges(); // Trigger change detection after state change
    }, 2000);
  }

}
