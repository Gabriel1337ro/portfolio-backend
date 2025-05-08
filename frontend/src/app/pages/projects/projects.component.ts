import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <section class="projects">
      <div class="container">
        <h1 class="section-title">My Projects</h1>
        <div class="projects-grid">
          <mat-card class="project-card" *ngFor="let project of projects">
            <img mat-card-image [src]="project.imageUrl" [alt]="project.title">
            <mat-card-content>
              <h2>{{project.title}}</h2>
              <p>{{project.description}}</p>
              <div class="technologies">
                <span class="tech-tag" *ngFor="let tech of project.technologies">{{tech}}</span>
              </div>
            </mat-card-content>
            <mat-card-actions>
              <a mat-button [href]="project.githubUrl" target="_blank" *ngIf="project.githubUrl">
                <i class="fab fa-github"></i> Code
              </a>
              <a mat-button [href]="project.liveUrl" target="_blank" *ngIf="project.liveUrl">
                <i class="fas fa-external-link-alt"></i> Live Demo
              </a>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .projects {
      padding: 80px 0;
      background-color: #0a192f;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      margin-top: 50px;
    }

    .project-card {
      background-color: #112240;
      color: #ccd6f6;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-10px);
      }

      img {
        height: 200px;
        object-fit: cover;
      }

      h2 {
        color: #64ffda;
        margin: 16px 0;
      }

      p {
        color: #8892b0;
        margin-bottom: 16px;
      }

      .technologies {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 16px;

        .tech-tag {
          background-color: rgba(100, 255, 218, 0.1);
          color: #64ffda;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.9rem;
        }
      }

      mat-card-actions {
        padding: 16px;
        display: flex;
        gap: 16px;

        a {
          color: #64ffda;
          
          i {
            margin-right: 8px;
          }
        }
      }
    }

    @media (max-width: 768px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'E-commerce Platform',
      description: 'A modern e-commerce solution built with Angular and Node.js, featuring real-time inventory management and secure payment processing.',
      imageUrl: 'assets/images/projects/ecommerce.jpg',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe'],
      githubUrl: 'https://github.com/gabriel1337ro/ecommerce',
      liveUrl: 'https://ecommerce.gabb1337.dev'
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team collaboration features.',
      imageUrl: 'assets/images/projects/taskapp.jpg',
      technologies: ['React', 'Firebase', 'Material-UI', 'Redux'],
      githubUrl: 'https://github.com/gabriel1337ro/taskapp',
      liveUrl: 'https://tasks.gabb1337.dev'
    },
    {
      title: 'Weather Dashboard',
      description: 'A weather forecasting dashboard that provides real-time weather data and interactive maps.',
      imageUrl: 'assets/images/projects/weather.jpg',
      technologies: ['Vue.js', 'OpenWeather API', 'Chart.js', 'Mapbox'],
      githubUrl: 'https://github.com/gabriel1337ro/weather',
      liveUrl: 'https://weather.gabb1337.dev'
    }
  ];
} 