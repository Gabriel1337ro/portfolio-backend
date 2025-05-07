import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <div class="container">
      <mat-card class="login-card">
        <h1>Iniciar Sesión</h1>
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <mat-form-field appearance="outline">
            <mat-label>Usuario</mat-label>
            <input matInput [(ngModel)]="username" name="username" required>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Contraseña</mat-label>
            <input matInput [(ngModel)]="password" name="password" type="password" required>
          </mat-form-field>

          <button mat-raised-button color="primary" type="submit" [disabled]="!loginForm.form.valid">
            Iniciar Sesión
          </button>
        </form>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      max-width: 400px;
      margin: 100px auto;
      padding: 20px;
    }

    .login-card {
      padding: 20px;
    }

    h1 {
      text-align: center;
      margin-bottom: 30px;
      color: #333;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    mat-form-field {
      width: 100%;
    }

    button {
      width: 100%;
    }
  `]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login(this.username, this.password)
      .subscribe({
        next: () => {
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          console.error('Error during login:', error);
          alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
        }
      });
  }
} 