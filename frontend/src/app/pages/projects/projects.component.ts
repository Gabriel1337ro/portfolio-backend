import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  demoUrl: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="container">
      <h1>Mis Proyectos</h1>
      <div class="projects-grid">
        <mat-card *ngFor="let project of projects" class="project-card">
          <img mat-card-image [src]="project.imageUrl" [alt]="project.title">
          <mat-card-content>
            <h2>{{ project.title }}</h2>
            <p>{{ project.description }}</p>
            <div class="technologies">
              <span *ngFor="let tech of project.technologies" class="tech-tag">
                {{ tech }}
              </span>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <a [href]="project.githubUrl" target="_blank" class="button">GitHub</a>
            <a [href]="project.demoUrl" target="_blank" class="button">Demo</a>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    h1 {
      text-align: center;
      margin-bottom: 40px;
      color: #333;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
    }

    .project-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .project-card img {
      height: 200px;
      object-fit: cover;
    }

    .project-card h2 {
      margin: 16px 0;
      color: #333;
    }

    .project-card p {
      color: #666;
      margin-bottom: 16px;
    }

    .technologies {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 16px;
    }

    .tech-tag {
      background-color: #e0e0e0;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8em;
      color: #333;
    }

    .button {
      display: inline-block;
      padding: 8px 16px;
      background-color: #1976d2;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      margin-right: 8px;
    }

    .button:hover {
      background-color: #1565c0;
    }
  `]
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.http.get<Project[]>('https://portfolio-backend-pq3p.onrender.com/api/projects')
      .subscribe({
        next: (data) => {
          this.projects = data;
        },
        error: (error) => {
          console.error('Error fetching projects:', error);
        }
      });
  }
} 