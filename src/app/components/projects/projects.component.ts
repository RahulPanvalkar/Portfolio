import { Component } from '@angular/core';
import { Project } from './model/project';
import { PreLoaderService } from 'src/app/services/pre-loader.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  imageCounter: number = 0;
  constructor(private preLoaderService: PreLoaderService) { }

  ngOnInit() {
    this.showLoader();
  }

  /**
   * Displays a loader animation to indicate that content is being loaded.
   */
  showLoader() {
    this.preLoaderService.show(); // Trigger the preloader via the preLoaderService.
  }

  /**
   * Increments the counter and hide the loader animation once all images have finished loading.
   */
  onLoadComplete() {
    this.imageCounter++;
    // Hide the preloader when all project images have been loaded.
    if (this.imageCounter === this.projects.length) {
      this.preLoaderService.hide();
    }
  }


  // Array to store project details
  projects: Project[] = [
    {
      imgPath: 'https://res.cloudinary.com/rahul-panvalkar/image/upload/Portfolio/Projects/quizhub.png',
      title: 'QuizHub',
      description: [
        'An intuitive quiz app enabling easy quiz creation and participation.',
        `Implemented user registration, login, quiz creation, timer-based quizzes and results tracking, supported by a robust backend service 'QuizEngine'.`,
        'Technologies: Angular, Java, Spring Boot, PostgreSQL'
      ],
      ghLink: 'https://github.com/RahulPanvalkar/QuizHub',
      demoLink: '',
    },
    {
      imgPath: 'https://res.cloudinary.com/rahul-panvalkar/image/upload/Portfolio/Projects/weatherapp.png',
      title: 'WeatherApp',
      description: [
        'Weather Application with geolocation option for receiving current weather and forecasts.',
        `Current weather conditions | 14-day forecasts | Hourly forecasts, with validations and custom responses using 'WeatherProxyService' backend.`,
        'Technologies: Angular, Spring Boot for WeatherProxyService, Docker'
      ],
      ghLink: 'https://github.com/RahulPanvalkar/WeatherApp',
      demoLink: 'https://weather-app-54ys.onrender.com',
    },
    {
      imgPath: 'https://res.cloudinary.com/rahul-panvalkar/image/upload/Portfolio/Projects/ebs.png',
      title: 'Electricity Billing System',
      description: [
        'System for managing electricity billing processes, including functionalities for admin and consumers.',
        'consumer | connection | bill | user account management',
        'Technologies: Java, Spring MVC, JSP, MySQL, JavaScript'
      ],
      ghLink: 'https://github.com/RahulPanvalkar/Electricity-Billing-System',
      demoLink: '',
    },
    {
      imgPath: 'https://res.cloudinary.com/rahul-panvalkar/image/upload/Portfolio/Projects/carousel.png',
      title: 'BirthDay Carousel',
      description: [
        '3D carousel application with mouse control for an interactive birthday celebration experience.',
        'Rotating carousel to display birthday messages, images and animations.',
        'Technologies: HTML, CSS, JavaScript'
      ],
      ghLink: 'https://github.com/RahulPanvalkar/Carousel',
      demoLink: 'https://carousel-f9t7.onrender.com',
    },
    {
      imgPath: 'https://res.cloudinary.com/rahul-panvalkar/image/upload/Portfolio/Projects/hms.png',
      title: 'Hotel Management System',
      description: [
        'Desktop Application aimed to streamline the operations and enhance the efficiency of hotel management processes.',
        'Reservation management | Room allocation | Guest check-in/check-out | Billing',
        'Technologies: Java, JavaFX, MySQL, FXML, Scene Builder App, CSS'
      ],
      ghLink: 'https://github.com/RahulPanvalkar/Hotel_Management_System',
      demoLink: '',
    },
  ];

}
