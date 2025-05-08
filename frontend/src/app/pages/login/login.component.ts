import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h1>Iniciar Sesión</h1>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" type="email" placeholder="tu@email.com">
            <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
              El email es requerido
            </mat-error>
            <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
              Ingresa un email válido
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Contraseña</mat-label>
            <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
            <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
              <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
            </button>
            <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
              La contraseña es requerida
            </mat-error>
          </mat-form-field>

          <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #0a192f;
      padding: 20px;
    }

    .login-card {
      background-color: #112240;
      padding: 40px;
      border-radius: 10px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

      h1 {
        color: #64ffda;
        text-align: center;
        margin-bottom: 30px;
        font-size: 2rem;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 20px;

        mat-form-field {
          width: 100%;
        }

        button[type="submit"] {
          padding: 12px;
          font-size: 1rem;
          margin-top: 10px;
        }
      }
    }

    @media (max-width: 480px) {
      .login-card {
        padding: 20px;
      }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          console.error('Error de inicio de sesión:', error);
          // Aquí podrías mostrar un mensaje de error al usuario
        }
      });
    }
  }
} 