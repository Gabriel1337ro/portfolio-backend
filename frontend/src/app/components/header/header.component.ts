import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header" [class.scrolled]="isScrolled">
      <nav class="navbar">
        <div class="logo">Gabb1337</div>
        <div class="nav-links" [class.active]="isMenuOpen">
          <a href="#home" (click)="onNavClick('home')">Home</a>
          <a href="#about" (click)="onNavClick('about')">About</a>
          <a href="#services" (click)="onNavClick('services')">Services</a>
          <a href="#portfolio" (click)="onNavClick('portfolio')">Portfolio</a>
          <a href="#contact" (click)="onNavClick('contact')">Contact</a>
        </div>
        <button class="btn-talk" (click)="onTalkClick()">Let's Talk</button>
        <button class="menu-toggle" (click)="toggleMenu()">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background-color: rgba(10, 25, 47, 0.95);
      backdrop-filter: blur(10px);
      z-index: 1000;
      padding: 20px 0;
      transition: all 0.3s ease;

      &.scrolled {
        padding: 15px 0;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      }
    }

    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: #64ffda;
    }

    .nav-links {
      display: flex;
      gap: 30px;

      a {
        color: #ccd6f6;
        text-decoration: none;
        font-size: 1rem;
        transition: color 0.3s ease;

        &:hover {
          color: #64ffda;
        }
      }

      @media (max-width: 768px) {
        display: none;
        position: fixed;
        top: 80px;
        left: 0;
        width: 100%;
        background-color: #0a192f;
        padding: 20px;
        flex-direction: column;
        align-items: center;
        gap: 20px;

        &.active {
          display: flex;
        }
      }
    }

    .btn-talk {
      background-color: transparent;
      border: 1px solid #64ffda;
      color: #64ffda;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background-color: rgba(100, 255, 218, 0.1);
      }

      @media (max-width: 768px) {
        display: none;
      }
    }

    .menu-toggle {
      display: none;
      flex-direction: column;
      gap: 6px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px;

      span {
        display: block;
        width: 25px;
        height: 2px;
        background-color: #64ffda;
        transition: all 0.3s ease;
      }

      @media (max-width: 768px) {
        display: flex;
      }
    }
  `]
})
export class HeaderComponent {
  @Input() isScrolled = false;
  @Input() isMenuOpen = false;
  @Output() menuToggle = new EventEmitter<void>();
  @Output() navClick = new EventEmitter<string>();
  @Output() talkClick = new EventEmitter<void>();

  toggleMenu() {
    this.menuToggle.emit();
  }

  onNavClick(section: string) {
    this.navClick.emit(section);
  }

  onTalkClick() {
    this.talkClick.emit();
  }
} 