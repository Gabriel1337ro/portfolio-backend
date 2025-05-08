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
      <div class="container">
        <h1 class="section-title">Contacto</h1>
        <div class="contact-content">
          <div class="contact-info">
            <h2>¡Hablemos!</h2>
            <p>¿Tienes un proyecto en mente? Me encantaría escuchar tus ideas y ayudarte a hacerlas realidad.</p>
            
            <div class="contact-details">
              <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <div>
                  <h3>Email</h3>
                  <p>gabriel1337ro@gmail.com</p>
                </div>
              </div>
              
              <div class="contact-item">
                <i class="fas fa-phone"></i>
                <div>
                  <h3>Teléfono</h3>
                  <p>+1 234 567 890</p>
                </div>
              </div>
              
              <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <div>
                  <h3>Ubicación</h3>
                  <p>Ciudad, País</p>
                </div>
              </div>
            </div>

            <div class="social-links">
              <a href="https://github.com/gabriel1337ro" target="_blank" class="social-link">
                <i class="fab fa-github"></i>
              </a>
              <a href="https://linkedin.com/in/gabriel1337ro" target="_blank" class="social-link">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="https://twitter.com/gabriel1337ro" target="_blank" class="social-link">
                <i class="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          <div class="contact-form">
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline">
                <mat-label>Nombre</mat-label>
                <input matInput formControlName="name" placeholder="Tu nombre">
                <mat-error *ngIf="contactForm.get('name')?.hasError('required')">
                  El nombre es requerido
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Email</mat-label>
                <input matInput formControlName="email" placeholder="tu@email.com">
                <mat-error *ngIf="contactForm.get('email')?.hasError('required')">
                  El email es requerido
                </mat-error>
                <mat-error *ngIf="contactForm.get('email')?.hasError('email')">
                  Ingresa un email válido
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Asunto</mat-label>
                <input matInput formControlName="subject" placeholder="Asunto del mensaje">
                <mat-error *ngIf="contactForm.get('subject')?.hasError('required')">
                  El asunto es requerido
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Mensaje</mat-label>
                <textarea matInput formControlName="message" rows="5" placeholder="Tu mensaje"></textarea>
                <mat-error *ngIf="contactForm.get('message')?.hasError('required')">
                  El mensaje es requerido
                </mat-error>
              </mat-form-field>

              <button mat-raised-button color="primary" type="submit" [disabled]="contactForm.invalid">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact {
      padding: 80px 0;
      background-color: #0a192f;
    }

    .contact-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 50px;
      margin-top: 50px;
    }

    .contact-info {
      h2 {
        color: #64ffda;
        font-size: 2rem;
        margin-bottom: 20px;
      }

      p {
        color: #8892b0;
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 40px;
      }

      .contact-details {
        display: flex;
        flex-direction: column;
        gap: 30px;
        margin-bottom: 40px;

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 20px;

          i {
            color: #64ffda;
            font-size: 1.5rem;
          }

          h3 {
            color: #ccd6f6;
            margin-bottom: 5px;
          }

          p {
            color: #8892b0;
            margin: 0;
          }
        }
      }

      .social-links {
        display: flex;
        gap: 20px;

        .social-link {
          color: #ccd6f6;
          font-size: 1.5rem;
          transition: color 0.3s ease;

          &:hover {
            color: #64ffda;
          }
        }
      }
    }

    .contact-form {
      form {
        display: flex;
        flex-direction: column;
        gap: 20px;

        mat-form-field {
          width: 100%;
        }

        button {
          align-self: flex-start;
          padding: 10px 30px;
          font-size: 1rem;
        }
      }
    }

    @media (max-width: 768px) {
      .contact-content {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // Aquí implementarías la lógica para enviar el formulario
      console.log(this.contactForm.value);
      this.snackBar.open('Mensaje enviado con éxito', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      this.contactForm.reset();
    }
  }
} 