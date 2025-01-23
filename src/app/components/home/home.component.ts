import { Component, HostListener } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private cdr: ChangeDetectorRef) { }

  texts: string[] = [
    'Software Developer',
    'Freelancer',
    'Fullstack Developer',
    'Open Source Contributor'
  ];
  
  currentText: string = '';
  textIndex: number = 0;

  // Initialize typewriter effect and preloader on component load
  ngOnInit() {
    this.startTypewriter();
  }

  // Typewriter effect: types text character by character
  startTypewriter() {
    let charIndex = 0;
    const type = () => {
      if (charIndex < this.texts[this.textIndex].length) {
        this.currentText += this.texts[this.textIndex].charAt(charIndex++);
        setTimeout(type, 100); // Typing speed
      } else {
        setTimeout(() => this.deleteTypewriter(), 1000); // Pause before deleting
      }
    };
    type();
  }

  // Deletes text character by character and loops to the next text
  deleteTypewriter() {
    const deleteText = () => {
      if (this.currentText.length > 0) {
        this.currentText = this.currentText.slice(0, -1);
        setTimeout(deleteText, 50); // Deleting speed
      } else {
        this.textIndex = (this.textIndex + 1) % this.texts.length;   // Loop through texts
        this.startTypewriter();
      }
    };
    deleteText();
  }

}
