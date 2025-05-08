import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Skill {
  id?: number;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'other';
  level: number;
  icon?: string;
}

@Component({
  selector: 'app-skills-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatSelectModule
  ],
  template: `
    <div class="skills-admin">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ isEditing ? 'Editar' : 'Nueva' }} Habilidad</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="skillForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Nombre</mat-label>
              <input matInput formControlName="name" placeholder="Nombre de la habilidad">
              <mat-error *ngIf="skillForm.get('name')?.hasError('required')">
                El nombre es requerido
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Categoría</mat-label>
              <mat-select formControlName="category">
                <mat-option value="frontend">Frontend</mat-option>
                <mat-option value="backend">Backend</mat-option>
                <mat-option value="database">Base de Datos</mat-option>
                <mat-option value="devops">DevOps</mat-option>
                <mat-option value="other">Otros</mat-option>
              </mat-select>
              <mat-error *ngIf="skillForm.get('category')?.hasError('required')">
                La categoría es requerida
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Nivel (1-5)</mat-label>
              <input matInput type="number" formControlName="level" min="1" max="5">
              <mat-error *ngIf="skillForm.get('level')?.hasError('required')">
                El nivel es requerido
              </mat-error>
              <mat-error *ngIf="skillForm.get('level')?.hasError('min') || skillForm.get('level')?.hasError('max')">
                El nivel debe estar entre 1 y 5
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Icono (opcional)</mat-label>
              <input matInput formControlName="icon" placeholder="fa-js">
              <mat-hint>Nombre del icono de Font Awesome (ej: fa-js, fa-angular)</mat-hint>
            </mat-form-field>

            <div class="form-actions">
              <button mat-raised-button color="primary" type="submit" [disabled]="skillForm.invalid">
                {{ isEditing ? 'Actualizar' : 'Crear' }} Habilidad
              </button>
              <button mat-button type="button" (click)="resetForm()" *ngIf="isEditing">
                Cancelar
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>

      <mat-card class="skills-table-card">
        <mat-card-header>
          <mat-card-title>Habilidades</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="skills" class="skills-table">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Nombre</th>
              <td mat-cell *matCellDef="let skill">{{skill.name}}</td>
            </ng-container>

            <ng-container matColumnDef="category">
              <th mat-header-cell *matHeaderCellDef>Categoría</th>
              <td mat-cell *matCellDef="let skill">{{skill.category}}</td>
            </ng-container>

            <ng-container matColumnDef="level">
              <th mat-header-cell *matHeaderCellDef>Nivel</th>
              <td mat-cell *matCellDef="let skill">
                <div class="skill-level">
                  <div class="skill-level-bars">
                    <div *ngFor="let i of [1,2,3,4,5]" 
                         class="skill-level-bar"
                         [class.active]="i <= skill.level">
                    </div>
                  </div>
                  <span>{{skill.level}}/5</span>
                </div>
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Acciones</th>
              <td mat-cell *matCellDef="let skill">
                <button mat-icon-button color="primary" (click)="editSkill(skill)">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="deleteSkill(skill.id)">
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
    .skills-admin {
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

    .skills-table-card {
      margin-top: 20px;
    }

    .skills-table {
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

    .skill-level {
      display: flex;
      align-items: center;
      gap: 10px;

      .skill-level-bars {
        display: flex;
        gap: 4px;

        .skill-level-bar {
          width: 20px;
          height: 4px;
          background-color: #233554;
          border-radius: 2px;

          &.active {
            background-color: #64ffda;
          }
        }
      }
    }

    @media (max-width: 768px) {
      .form-actions {
        flex-direction: column;
      }

      .skills-table {
        display: block;
        overflow-x: auto;
      }
    }
  `]
})
export class SkillsAdminComponent implements OnInit {
  skills: Skill[] = [];
  skillForm: FormGroup;
  isEditing = false;
  displayedColumns: string[] = ['name', 'category', 'level', 'actions'];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.skillForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      level: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      icon: ['']
    });
  }

  ngOnInit() {
    this.loadSkills();
  }

  loadSkills() {
    // Aquí implementarías la carga de habilidades desde el backend
    this.skills = [
      {
        id: 1,
        name: 'Angular',
        category: 'frontend',
        level: 5,
        icon: 'fa-angular'
      },
      {
        id: 2,
        name: 'Node.js',
        category: 'backend',
        level: 4,
        icon: 'fa-node-js'
      }
    ];
  }

  onSubmit() {
    if (this.skillForm.valid) {
      const skill: Skill = this.skillForm.value;

      if (this.isEditing) {
        this.updateSkill(skill);
      } else {
        this.createSkill(skill);
      }
    }
  }

  editSkill(skill: Skill) {
    this.skillForm.patchValue(skill);
    this.isEditing = true;
  }

  deleteSkill(id?: number) {
    if (id && confirm('¿Estás seguro de que deseas eliminar esta habilidad?')) {
      // Aquí implementarías la eliminación de la habilidad
      this.snackBar.open('Habilidad eliminada correctamente', 'Cerrar', {
        duration: 3000
      });
      this.loadSkills();
    }
  }

  resetForm() {
    this.skillForm.reset();
    this.isEditing = false;
  }

  private createSkill(skill: Skill) {
    // Aquí implementarías la creación de la habilidad
    this.snackBar.open('Habilidad creada correctamente', 'Cerrar', {
      duration: 3000
    });
    this.resetForm();
    this.loadSkills();
  }

  private updateSkill(skill: Skill) {
    // Aquí implementarías la actualización de la habilidad
    this.snackBar.open('Habilidad actualizada correctamente', 'Cerrar', {
      duration: 3000
    });
    this.resetForm();
    this.loadSkills();
  }
} 