import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-content>
          <h1>Bienvenido a mi Portfolio</h1>
          <h2>Desarrollador Full Stack</h2>
          <p>
            Soy un desarrollador apasionado por crear soluciones web innovadoras y eficientes.
            Explora mis proyectos y contáctame si tienes alguna pregunta o propuesta.
          </p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    mat-card {
      text-align: center;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    h2 {
      color: #666;
      margin-bottom: 1.5rem;
    }
    p {
      font-size: 1.1rem;
      line-height: 1.6;
    }
  `]
})
export class HomeComponent {} 