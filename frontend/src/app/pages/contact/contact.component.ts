import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
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
      <mat-card class="contact-card">
        <h1>Contacto</h1>
        <form (ngSubmit)="onSubmit()" #contactForm="ngForm">
          <mat-form-field appearance="outline">
            <mat-label>Nombre</mat-label>
            <input matInput [(ngModel)]="formData.name" name="name" required>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput [(ngModel)]="formData.email" name="email" type="email" required>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Mensaje</mat-label>
            <textarea matInput [(ngModel)]="formData.message" name="message" rows="5" required></textarea>
          </mat-form-field>

          <button mat-raised-button color="primary" type="submit" [disabled]="!contactForm.form.valid">
            Enviar Mensaje
          </button>
        </form>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }

    .contact-card {
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
      align-self: flex-end;
      min-width: 120px;
    }
  `]
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('https://portfolio-backend-pq3p.onrender.com/api/contact', this.formData)
      .subscribe({
        next: () => {
          alert('Mensaje enviado correctamente');
          this.formData = { name: '', email: '', message: '' };
        },
        error: (error) => {
          console.error('Error sending message:', error);
          alert('Error al enviar el mensaje');
        }
      });
  }
} 