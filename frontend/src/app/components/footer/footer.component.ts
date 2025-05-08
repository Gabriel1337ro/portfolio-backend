import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <div class="footer-content">
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
        <p>&copy; {{ currentYear }} Gabb1337. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #0a192f;
      color: #8892b0;
      padding: 2rem 0;
      margin-top: auto;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
      padding: 0 1rem;
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-bottom: 1rem;
    }

    .social-links a {
      color: #8892b0;
      transition: color 0.3s ease;
    }

    .social-links a:hover {
      color: #64ffda;
    }

    p {
      margin: 0;
      font-size: 0.9rem;
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
} 