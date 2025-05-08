import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Project {
  id?: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
}

@Component({
  selector: 'app-projects-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule
  ],
  template: `
    <div class="projects-admin">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ isEditing ? 'Editar' : 'Nuevo' }} Proyecto</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="projectForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Título</mat-label>
              <input matInput formControlName="title" placeholder="Título del proyecto">
              <mat-error *ngIf="projectForm.get('title')?.hasError('required')">
                El título es requerido
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Descripción</mat-label>
              <textarea matInput formControlName="description" rows="3" placeholder="Descripción del proyecto"></textarea>
              <mat-error *ngIf="projectForm.get('description')?.hasError('required')">
                La descripción es requerida
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Tecnologías (separadas por comas)</mat-label>
              <input matInput formControlName="technologiesInput" placeholder="Angular, Node.js, MongoDB">
              <mat-error *ngIf="projectForm.get('technologiesInput')?.hasError('required')">
                Las tecnologías son requeridas
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>URL de la imagen</mat-label>
              <input matInput formControlName="imageUrl" placeholder="https://ejemplo.com/imagen.jpg">
              <mat-error *ngIf="projectForm.get('imageUrl')?.hasError('required')">
                La URL de la imagen es requerida
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>URL de GitHub</mat-label>
              <input matInput formControlName="githubUrl" placeholder="https://github.com/usuario/proyecto">
              <mat-error *ngIf="projectForm.get('githubUrl')?.hasError('required')">
                La URL de GitHub es requerida
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>URL de Demo</mat-label>
              <input matInput formControlName="liveUrl" placeholder="https://proyecto.ejemplo.com">
              <mat-error *ngIf="projectForm.get('liveUrl')?.hasError('required')">
                La URL de demo es requerida
              </mat-error>
            </mat-form-field>

            <div class="form-actions">
              <button mat-raised-button color="primary" type="submit" [disabled]="projectForm.invalid">
                {{ isEditing ? 'Actualizar' : 'Crear' }} Proyecto
              </button>
              <button mat-button type="button" (click)="resetForm()" *ngIf="isEditing">
                Cancelar
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>

      <mat-card class="projects-table-card">
        <mat-card-header>
          <mat-card-title>Proyectos</mat-card-title>
        </mat-card-header>
        <mat-card-content>
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
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .projects-admin {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    mat-card {
      background-color: #112240;
      color: #ccd6f6;
    }

    mat-card-header {
      margin-bottom: 20px;

      mat-card-title {
        color: #64ffda;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }

    .projects-table-card {
      margin-top: 20px;
    }

    .projects-table {
      width: 100%;
      background-color: transparent;

      th {
        color: #64ffda;
        font-weight: 500;
      }

      td {
        color: #8892b0;
      }

      .mat-column-actions {
        width: 120px;
        text-align: center;
      }
    }

    @media (max-width: 768px) {
      .form-actions {
        flex-direction: column;
      }

      .projects-table {
        display: block;
        overflow-x: auto;
      }
    }
  `]
})
export class ProjectsAdminComponent implements OnInit {
  projects: Project[] = [];
  projectForm: FormGroup;
  isEditing = false;
  displayedColumns: string[] = ['title', 'technologies', 'actions'];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      technologiesInput: ['', Validators.required],
      imageUrl: ['', Validators.required],
      githubUrl: ['', Validators.required],
      liveUrl: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    // Aquí implementarías la carga de proyectos desde el backend
    this.projects = [
      {
        id: 1,
        title: 'E-commerce Platform',
        description: 'A modern e-commerce solution built with Angular and Node.js',
        technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe'],
        imageUrl: 'assets/images/projects/ecommerce.jpg',
        githubUrl: 'https://github.com/gabriel1337ro/ecommerce',
        liveUrl: 'https://ecommerce.gabb1337.dev'
      }
    ];
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const formValue = this.projectForm.value;
      const project: Project = {
        ...formValue,
        technologies: formValue.technologiesInput.split(',').map((tech: string) => tech.trim())
      };

      if (this.isEditing) {
        this.updateProject(project);
      } else {
        this.createProject(project);
      }
    }
  }

  editProject(project: Project) {
    this.projectForm.patchValue({
      ...project,
      technologiesInput: project.technologies.join(', ')
    });
    this.isEditing = true;
  }

  deleteProject(id?: number) {
    if (id && confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      // Aquí implementarías la eliminación del proyecto
      this.snackBar.open('Proyecto eliminado correctamente', 'Cerrar', {
        duration: 3000
      });
      this.loadProjects();
    }
  }

  resetForm() {
    this.projectForm.reset();
    this.isEditing = false;
  }

  private createProject(project: Project) {
    // Aquí implementarías la creación del proyecto
    this.snackBar.open('Proyecto creado correctamente', 'Cerrar', {
      duration: 3000
    });
    this.resetForm();
    this.loadProjects();
  }

  private updateProject(project: Project) {
    // Aquí implementarías la actualización del proyecto
    this.snackBar.open('Proyecto actualizado correctamente', 'Cerrar', {
      duration: 3000
    });
    this.resetForm();
    this.loadProjects();
  }
} 