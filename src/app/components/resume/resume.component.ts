import { Component, HostListener } from '@angular/core';
import { PreLoaderService } from 'src/app/services/pre-loader.service';
import { ResumeService } from './resume.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {

  // URLs to the PDF and Image files to display in the component
  pdfUrl: string = 'https://res.cloudinary.com/rahul-panvalkar/image/upload/Portfolio/Resume/Rahul_Panvalkar-Resume.pdf';
  imageUrl: string = 'https://res.cloudinary.com/rahul-panvalkar/image/upload/Portfolio/Resume/Rahul-Resume.png';

  showImage: boolean = true; // Flag to determine whether to show an image (for smaller screens)

  // To download original file from cloud storage
  pdfDownloadUrl: string = 'https://res.cloudinary.com/rahul-panvalkar/image/upload/Portfolio/Resume/Rahul_Panvalkar-Resume.pdf';

  constructor(private preLoaderService: PreLoaderService, private resumeService: ResumeService) { }

  /**
   * Lifecycle hook that initializes the component.
   * - Determines the viewport size to toggle between image and PDF display.
   * - Loads the PDF and image files from storage or a remote source.
   * - Sets up a listener to clear cached data when the tab is closed.
   */
  ngOnInit() {
    this.checkViewport(); // Set the display mode (image or PDF) based on screen size.
    this.loadFiles(); // Load the PDF and image files.
  }

  /**
   * Event listener that triggers when the window is resized.
   * - Adjusts the display mode based on the new viewport size.
   */
  @HostListener('window:resize')
  onResize(): void {
    this.checkViewport(); // Recheck the viewport and update the display mode accordingly.
  }

  /**
   * Checks the current viewport width and sets the `showImage` flag.
   * - If the width is less than or equal to 850px, it displays the image; otherwise, it displays the PDF.
   */
  checkViewport(): void {
    const width = window.innerWidth;
    this.showImage = width <= 850; // Use image view for smaller screens.
  }


  /**
   * Asynchronously loads the PDF and image files.
   * - Uses the `resumeService` to load the PDF and image files, either from IndexedDB or by fetching from the URL.
   * - The files are loaded and URLs are set for usage in the component.
   */
  private async loadFiles(): Promise<void> {
    try {
      // show preLoader animation
      this.showLoader();
      setTimeout(() => this.preLoaderService.hide(), 10000); 

      // Use the service to load files
      this.imageUrl = await this.resumeService.loadFile('resumeImage', this.imageUrl);
      this.pdfUrl = await this.resumeService.loadFile('resumePdf', this.pdfUrl);
    } catch (error) {
      console.error('Error loading files:', error);
    }
  }


  /**
   * Displays a loader animation to indicate that content is being loaded.
   */
  showLoader() {
    this.preLoaderService.show(); // Trigger the preloader via the preLoaderService.
  }

  /**
   * Hides the loader animation once the content has finished loading.
   */
  onLoadComplete() {
    this.preLoaderService.hide(); // Stop the preloader animation.
  }
}
