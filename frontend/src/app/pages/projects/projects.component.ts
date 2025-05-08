import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <section class="projects">
      <h1>My Projects</h1>
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
            <a mat-button [href]="project.githubUrl" target="_blank">GitHub</a>
            <a mat-button *ngIf="project.liveUrl" [href]="project.liveUrl" target="_blank">Live Demo</a>
          </mat-card-actions>
        </mat-card>
      </div>
    </section>
  `,
  styles: [`
    .projects {
      padding: 2rem 0;
    }

    h1 {
      text-align: center;
      color: #ccd6f6;
      margin-bottom: 3rem;
      font-size: 2.5rem;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      padding: 0 2rem;
    }

    .project-card {
      background-color: #1d3461;
      color: #ccd6f6;
      transition: transform 0.3s ease;
    }

    .project-card:hover {
      transform: translateY(-5px);
    }

    .project-card img {
      height: 200px;
      object-fit: cover;
    }

    .project-card h2 {
      margin: 1rem 0;
      color: #64ffda;
    }

    .project-card p {
      color: #8892b0;
      margin-bottom: 1rem;
    }

    .technologies {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .tech-tag {
      background-color: #64ffda;
      color: #0a192f;
      padding: 0.25rem 0.75rem;
      border-radius: 15px;
      font-size: 0.8rem;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2rem;
      }

      .projects-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  private loadProjects(): void {
    this.projectService.getAllProjects().subscribe(
      projects => {
        this.projects = projects;
      },
      error => {
        console.error('Error loading projects:', error);
      }
    );
  }
} 