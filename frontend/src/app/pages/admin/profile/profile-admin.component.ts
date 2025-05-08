import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Profile {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  github: string;
  linkedin: string;
  twitter: string;
  avatar: string;
}

@Component({
  selector: 'app-profile-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  template: `
    <div class="profile-admin">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Información Personal</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Nombre</mat-label>
                <input matInput formControlName="name" placeholder="Tu nombre completo">
                <mat-error *ngIf="profileForm.get('name')?.hasError('required')">
                  El nombre es requerido
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Título</mat-label>
                <input matInput formControlName="title" placeholder="Tu título profesional">
                <mat-error *ngIf="profileForm.get('title')?.hasError('required')">
                  El título es requerido
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Email</mat-label>
                <input matInput formControlName="email" placeholder="tu@email.com">
                <mat-error *ngIf="profileForm.get('email')?.hasError('required')">
                  El email es requerido
                </mat-error>
                <mat-error *ngIf="profileForm.get('email')?.hasError('email')">
                  Ingresa un email válido
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Teléfono</mat-label>
                <input matInput formControlName="phone" placeholder="+1234567890">
                <mat-error *ngIf="profileForm.get('phone')?.hasError('required')">
                  El teléfono es requerido
                </mat-error>
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline">
              <mat-label>Ubicación</mat-label>
              <input matInput formControlName="location" placeholder="Ciudad, País">
              <mat-error *ngIf="profileForm.get('location')?.hasError('required')">
                La ubicación es requerida
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Biografía</mat-label>
              <textarea matInput formControlName="bio" rows="4" placeholder="Cuéntanos sobre ti..."></textarea>
              <mat-error *ngIf="profileForm.get('bio')?.hasError('required')">
                La biografía es requerida
              </mat-error>
            </mat-form-field>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>GitHub</mat-label>
                <input matInput formControlName="github" placeholder="https://github.com/tuusuario">
                <mat-error *ngIf="profileForm.get('github')?.hasError('required')">
                  La URL de GitHub es requerida
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>LinkedIn</mat-label>
                <input matInput formControlName="linkedin" placeholder="https://linkedin.com/in/tuusuario">
                <mat-error *ngIf="profileForm.get('linkedin')?.hasError('required')">
                  La URL de LinkedIn es requerida
                </mat-error>
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline">
              <mat-label>Twitter</mat-label>
              <input matInput formControlName="twitter" placeholder="https://twitter.com/tuusuario">
              <mat-error *ngIf="profileForm.get('twitter')?.hasError('required')">
                La URL de Twitter es requerida
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>URL del Avatar</mat-label>
              <input matInput formControlName="avatar" placeholder="https://ejemplo.com/avatar.jpg">
              <mat-error *ngIf="profileForm.get('avatar')?.hasError('required')">
                La URL del avatar es requerida
              </mat-error>
            </mat-form-field>

            <div class="form-actions">
              <button mat-raised-button color="primary" type="submit" [disabled]="profileForm.invalid">
                Guardar Cambios
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .profile-admin {
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

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProfileAdminComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      location: ['', Validators.required],
      bio: ['', Validators.required],
      github: ['', Validators.required],
      linkedin: ['', Validators.required],
      twitter: ['', Validators.required],
      avatar: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    // Aquí implementarías la carga del perfil desde el backend
    const mockProfile: Profile = {
      name: 'Gabriel Rodríguez',
      title: 'Desarrollador Full Stack',
      email: 'gabriel@gabb1337.dev',
      phone: '+1234567890',
      location: 'Ciudad de México, México',
      bio: 'Desarrollador apasionado por crear soluciones web innovadoras...',
      github: 'https://github.com/gabriel1337ro',
      linkedin: 'https://linkedin.com/in/gabriel1337ro',
      twitter: 'https://twitter.com/gabriel1337ro',
      avatar: 'assets/images/avatar.jpg'
    };

    this.profileForm.patchValue(mockProfile);
  }

  onSubmit() {
    if (this.profileForm.valid) {
      // Aquí implementarías la actualización del perfil
      this.snackBar.open('Perfil actualizado correctamente', 'Cerrar', {
        duration: 3000
      });
    }
  }
} 