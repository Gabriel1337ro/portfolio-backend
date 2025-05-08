import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-home',
  template: `
    <section class="hero">
      <div class="hero-content">
        <h1>Hi, I'm Gabb1337</h1>
        <h2>Full Stack Developer</h2>
        <p>I build modern web applications with cutting-edge technologies.</p>
        <button mat-raised-button color="primary" routerLink="/projects">View My Work</button>
      </div>
    </section>

    <section class="featured-projects">
      <h2>Featured Projects</h2>
      <div class="projects-grid">
        <mat-card *ngFor="let project of featuredProjects" class="project-card">
          <img mat-card-image [src]="project.imageUrl" [alt]="project.title">
          <mat-card-content>
            <h3>{{ project.title }}</h3>
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
    .hero {
      min-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      background-color: #0a192f;
      color: #ccd6f6;
    }

    .hero-content {
      max-width: 800px;
      padding: 2rem;
    }

    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      color: #64ffda;
    }

    h2 {
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }

    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      color: #8892b0;
    }

    .featured-projects {
      padding: 4rem 0;
      background-color: #112240;
    }

    h2 {
      text-align: center;
      margin-bottom: 3rem;
      color: #ccd6f6;
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
    }

    .project-card img {
      height: 200px;
      object-fit: cover;
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

      h2 {
        font-size: 1.5rem;
      }

      .projects-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredProjects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadFeaturedProjects();
  }

  private loadFeaturedProjects(): void {
    this.projectService.getAllProjects().subscribe(
      projects => {
        this.featuredProjects = projects.filter(project => project.featured);
      },
      error => {
        console.error('Error loading featured projects:', error);
      }
    );
  }
} 