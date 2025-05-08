import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from '@models/profile.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">Gabb1337</div>
          <div class="social-links">
            <a [href]="profile?.socialLinks?.github" class="social-link" target="_blank">
              <i class="fab fa-github"></i>
            </a>
            <a [href]="profile?.socialLinks?.linkedin" class="social-link" target="_blank">
              <i class="fab fa-linkedin"></i>
            </a>
            <a [href]="profile?.socialLinks?.twitter" class="social-link" target="_blank">
              <i class="fab fa-twitter"></i>
            </a>
            <a [href]="profile?.socialLinks?.instagram" class="social-link" target="_blank">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; {{currentYear}} Gabb1337. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #112240;
      padding: 50px 0 20px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 20px;
        text-align: center;
      }
    }

    .footer-logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: #64ffda;
    }

    .social-links {
      display: flex;
      gap: 20px;

      .social-link {
        color: #ccd6f6;
        font-size: 1.2rem;
        transition: color 0.3s ease;

        &:hover {
          color: #64ffda;
        }
      }
    }

    .footer-bottom {
      text-align: center;
      color: #8892b0;
      font-size: 0.9rem;
    }
  `]
})
export class FooterComponent {
  @Input() profile: Profile | null = null;
  currentYear = new Date().getFullYear();
} 