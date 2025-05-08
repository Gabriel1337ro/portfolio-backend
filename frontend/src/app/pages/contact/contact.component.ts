import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <section class="contact">
      <h1>Get in Touch</h1>
      <div class="contact-container">
        <div class="contact-info">
          <h2>Contact Information</h2>
          <p>Feel free to reach out to me for any questions or opportunities.</p>
          <div class="info-item">
            <mat-icon>email</mat-icon>
            <span>gabriel&#64;example.com</span>
          </div>
          <div class="info-item">
            <mat-icon>location_on</mat-icon>
            <span>Ciudad, País</span>
          </div>
          <div class="social-links">
            <a href="https://github.com/gabb1337" target="_blank" rel="noopener noreferrer">
              <mat-icon>code</mat-icon>
            </a>
            <a href="https://linkedin.com/in/gabb1337" target="_blank" rel="noopener noreferrer">
              <mat-icon>business</mat-icon>
            </a>
            <a href="https://twitter.com/gabb1337" target="_blank" rel="noopener noreferrer">
              <mat-icon>chat</mat-icon>
            </a>
          </div>
        </div>

        <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
          <mat-form-field appearance="outline">
            <mat-label>Name</mat-label>
            <input matInput formControlName="name" placeholder="Your name">
            <mat-error *ngIf="contactForm.get('name')?.hasError('required')">
              Name is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" placeholder="Your email">
            <mat-error *ngIf="contactForm.get('email')?.hasError('required')">
              Email is required
            </mat-error>
            <mat-error *ngIf="contactForm.get('email')?.hasError('email')">
              Please enter a valid email
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Message</mat-label>
            <textarea matInput formControlName="message" rows="5" placeholder="Your message"></textarea>
            <mat-error *ngIf="contactForm.get('message')?.hasError('required')">
              Message is required
            </mat-error>
          </mat-form-field>

          <button mat-raised-button color="primary" type="submit" [disabled]="!contactForm.valid">
            Send Message
          </button>
        </form>
      </div>
    </section>
  `,
  styles: [`
    .contact {
      padding: 2rem 0;
    }

    h1 {
      text-align: center;
      color: #ccd6f6;
      margin-bottom: 3rem;
      font-size: 2.5rem;
    }

    .contact-container {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 3rem;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .contact-info {
      background-color: #1d3461;
      padding: 2rem;
      border-radius: 8px;
      color: #ccd6f6;
    }

    .contact-info h2 {
      color: #64ffda;
      margin-bottom: 1rem;
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 1rem 0;
    }

    .social-links {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    .social-links a {
      color: #8892b0;
      transition: color 0.3s ease;
    }

    .social-links a:hover {
      color: #64ffda;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    mat-form-field {
      width: 100%;
    }

    button {
      align-self: flex-start;
    }

    @media (max-width: 768px) {
      .contact-container {
        grid-template-columns: 1fr;
      }

      h1 {
        font-size: 2rem;
      }
    }
  `]
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      // Implementar lógica de envío del formulario
      this.contactForm.reset();
    }
  }
} 