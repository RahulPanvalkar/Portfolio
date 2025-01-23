import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  expand = false; // Track the state of the navbar (expanded or collapsed)
  isSticky = false; // Tracks if the navbar should have the sticky class
  activeLink: string = '';  // Current active link
  preActiveLink: string = '';  // Previous active link before hovering

  ngOnInit(): void {
    // Set active link initially based on current URL
    let path = window.location.pathname;
    this.setActiveLinkBasedOnUrl(path);  // Using window.location.pathname for the current URL
  }

  // Set active link based on the URL path
  setActiveLinkBasedOnUrl(url: string): void {
    // Get the base path of the URL
    const basePath = url.split('/')[1]; // Extract the part after the first "/"

    switch (basePath) {
      case 'about':
        this.setActiveLink('about');
        break;
      case 'projects':
        this.setActiveLink('projects');
        break;
      case 'resume':
        this.setActiveLink('resume');
        break;
      default:
        this.setActiveLink('home');  // Default to 'home' if none match
    }
  }

  // Set active link when clicked
  setActiveLink(link: string): void {
    this.activeLink = link;
    this.preActiveLink = link;
    this.collapseNavbar();
  }

  // Handle mouse enter to set active link temporarily
  setActiveLinkOnHover(link: string): void {
    // If hovering over a different link, store the previous active link
    if (this.activeLink !== link) {
      this.preActiveLink = this.activeLink;
      this.activeLink = link;
    }
  }

  // Revert to previous active link when hover ends
  setActiveLinkOnLeave(): void {
    // console.log("setActiveLinkOnLeave >> restoring activeLink: ", this.preActiveLink);
    this.activeLink = this.preActiveLink;  // Restore the previous active link
  }


  // Toggle the navbar state (expand or collapse) when called
  toggleExpand() {
    this.expand = !this.expand;
  }

  // Collapse navbar when clicked on the link
  collapseNavbar() {
    this.expand = false;
  }

  // Listen for window resize events to adjust the navbar state accordingly
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = window.innerWidth;
    // Collapse the navbar if the window is resized to a width greater than 768px (desktop view)
    if (width > 768) {
      this.expand = false; // Collapse navbar when viewport is wide (desktop)
    }
  }

  // Listen for window scroll events to dynamically add sticky class to navbar
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isSticky = window.scrollY > 0;
  }
}