import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StarfieldService {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private stars: any[] = [];
  private numStars: number = 100;

  constructor() {}

  init() {
    // Step 1: Get the canvas element and its drawing context
    this.canvas = document.getElementById('starfield') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    // Step 2: Set the canvas size to cover the whole screen
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Step 3: Generate stars
    this.generateStars();

    // Step 4: Start the animation
    this.animate();
  }

  // Step 5: Generate random stars
  private generateStars() {
    for (let i = 0; i < this.numStars; i++) {
      const radius = Math.random() < 0.5 ? 0.6 : 1.2; // Random size: 0.6px (small) or 1.2px (medium)
      this.stars.push({
        x: Math.random() * this.canvas.width,    // Random X position
        y: Math.random() * this.canvas.height,   // Random Y position
        radius: radius,                          // Size of the star
        speed: Math.random() * 0.2 + 0.1,        // Random speed (between 0.1 and 0.3)
      });
    }
  }

  // Step 6: Animate stars
  private animate() {
    // Clear the canvas to prepare for the next frame
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Loop through all stars and update their positions
    this.stars.forEach((star) => {
      // Draw the star
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = '#fff'; // White color for the stars
      this.ctx.fill();

      // Move the star upwards
      star.y -= star.speed;

      // If the star reaches the top, reset it to the bottom
      if (star.y < 0) {
        star.y = this.canvas.height;        // Reset Y position to the bottom
        star.x = Math.random() * this.canvas.width; // New random X position
      }
    });

    // Request the next animation frame
    requestAnimationFrame(this.animate.bind(this));
  }
}
