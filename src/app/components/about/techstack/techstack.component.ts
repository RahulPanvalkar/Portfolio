import { Component } from '@angular/core';

@Component({
  selector: 'app-techstack',
  templateUrl: './techstack.component.html',
  styleUrls: ['./techstack.component.css'],
})
export class TechstackComponent {
  // Array to hold tech stack items with name and corresponding icon class for display
  techStack = [
    { name: 'Java', iconClass: 'fab fa-java' },
    { name: 'SpringBoot', iconClass: 'fas fa-leaf' },
    { name: 'Hibernate', iconClass: 'fas fa-cogs' },
    { name: 'JSP', iconClass: 'fas fa-file-code' },
    { name: 'Servlet', iconClass: 'fas fa-download' },
    { name: 'REST API', iconClass: 'fas fa-cloud-download-alt' },
    { name: 'JavaFX', iconClass: 'fas fa-desktop' },
    { name: 'MySQL', iconClass: 'fas fa-database' },
    { name: 'Oracle', iconClass: 'fas fa-project-diagram' },
    { name: 'Angular', iconClass: 'fab fa-angular' },
    { name: 'JavaScript', iconClass: 'fab fa-js' },
    { name: 'Git', iconClass: 'fab fa-git-alt' },
    { name: 'Docker', iconClass: 'fab fa-docker' },
    { name: 'Tomcat', iconClass: 'fas fa-server' },
    { name: 'AWS', iconClass: 'fab fa-aws' },
    { name: 'Communication', iconClass: 'fas fa-comments' },
    { name: 'Problem-Solving', iconClass: 'fas fa-lightbulb' },
    { name: 'Teamwork', iconClass: 'fas fa-users' },
    { name: 'Attention to Detail', iconClass: 'fas fa-search' },
  ];

}
