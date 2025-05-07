import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

interface Project {
  id?: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  demoUrl: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  template: `
    <div class="container">
      <mat-card class="admin-card">
        <h1>Administración de Proyectos</h1>
        
        <!-- Formulario de proyecto -->
        <form (ngSubmit)="onSubmit()" #projectForm="ngForm" class="project-form">
          <mat-form-field appearance="outline">
            <mat-label>Título</mat-label>
            <input matInput [(ngModel)]="project.title" name="title" required>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Descripción</mat-label>
            <textarea matInput [(ngModel)]="project.description" name="description" rows="3" required></textarea>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Tecnologías (separadas por comas)</mat-label>
            <input matInput [(ngModel)]="technologiesInput" name="technologies" required>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>URL de la imagen</mat-label>
            <input matInput [(ngModel)]="project.imageUrl" name="imageUrl" required>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>URL de GitHub</mat-label>
            <input matInput [(ngModel)]="project.githubUrl" name="githubUrl" required>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>URL de Demo</mat-label>
            <input matInput [(ngModel)]="project.demoUrl" name="demoUrl" required>
          </mat-form-field>

          <div class="button-group">
            <button mat-raised-button color="primary" type="submit" [disabled]="!projectForm.form.valid">
              {{ isEditing ? 'Actualizar' : 'Agregar' }} Proyecto
            </button>
            <button mat-button type="button" (click)="resetForm()" *ngIf="isEditing">
              Cancelar
            </button>
          </div>
        </form>

        <!-- Tabla de proyectos -->
        <table mat-table [dataSource]="projects" class="projects-table">
          <ng-container matColumnDef="title">
            <th mat-header-cell *matHeaderCellDef>Título</th>
            <td mat-cell *matCellDef="let project">{{project.title}}</td>
          </ng-container>

          <ng-container matColumnDef="technologies">
            <th mat-header-cell *matHeaderCellDef>Tecnologías</th>
            <td mat-cell *matCellDef="let project">{{project.technologies.join(', ')}}</td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Acciones</th>
            <td mat-cell *matCellDef="let project">
              <button mat-icon-button color="primary" (click)="editProject(project)">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="deleteProject(project.id)">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .admin-card {
      padding: 20px;
    }

    h1 {
      text-align: center;
      margin-bottom: 30px;
      color: #333;
    }

    .project-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 40px;
    }

    mat-form-field {
      width: 100%;
    }

    .button-group {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }

    .projects-table {
      width: 100%;
      margin-top: 20px;
    }

    .mat-column-actions {
      width: 120px;
      text-align: center;
    }
  `]
})
export class AdminComponent implements OnInit {
  projects: Project[] = [];
  project: Project = {
    title: '',
    description: '',
    technologies: [],
    imageUrl: '',
    githubUrl: '',
    demoUrl: ''
  };
  technologiesInput: string = '';
  isEditing: boolean = false;
  displayedColumns: string[] = ['title', 'technologies', 'actions'];

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

  onSubmit() {
    this.project.technologies = this.technologiesInput.split(',').map(tech => tech.trim());
    
    if (this.isEditing && this.project.id) {
      this.updateProject();
    } else {
      this.createProject();
    }
  }

  editProject(project: Project) {
    this.project = { ...project };
    this.technologiesInput = project.technologies.join(', ');
    this.isEditing = true;
  }

  deleteProject(id: number) {
    if (id && confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      this.http.delete(`https://portfolio-backend-pq3p.onrender.com/api/projects/${id}`)
        .subscribe({
          next: () => {
            alert('Proyecto eliminado correctamente');
            this.loadProjects();
          },
          error: (error) => {
            console.error('Error deleting project:', error);
            alert('Error al eliminar el proyecto');
          }
        });
    }
  }

  resetForm() {
    this.project = {
      title: '',
      description: '',
      technologies: [],
      imageUrl: '',
      githubUrl: '',
      demoUrl: ''
    };
    this.technologiesInput = '';
    this.isEditing = false;
  }

  updateProject() {
    this.http.put(`https://portfolio-backend-pq3p.onrender.com/api/projects/${this.project.id}`, this.project)
      .subscribe({
        next: () => {
          alert('Proyecto actualizado correctamente');
          this.loadProjects();
        },
        error: (error) => {
          console.error('Error updating project:', error);
          alert('Error al actualizar el proyecto');
        }
      });
  }

  createProject() {
    this.http.post('https://portfolio-backend-pq3p.onrender.com/api/projects', this.project)
      .subscribe({
        next: () => {
          alert('Proyecto creado correctamente');
          this.loadProjects();
        },
        error: (error) => {
          console.error('Error creating project:', error);
          alert('Error al crear el proyecto');
        }
      });
  }
} 