import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockProfileService } from '@services/mock-profile.service';
import { Profile } from '@models/profile.model';
import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent]
})
export class HomeComponent implements OnInit {
  profile: Profile | null = null;
  services = [
    {
      icon: 'code',
      title: 'Desarrollo Web',
      description: 'Creamos sitios web modernos y responsivos utilizando las últimas tecnologías.'
    },
    {
      icon: 'phone_android',
      title: 'Desarrollo Móvil',
      description: 'Aplicaciones móviles nativas y multiplataforma para iOS y Android.'
    },
    {
      icon: 'cloud',
      title: 'Cloud Solutions',
      description: 'Soluciones en la nube escalables y seguras para tu negocio.'
    }
  ];

  portfolioItems = [
    {
      image: 'assets/images/portfolio-1.jpg',
      title: 'Proyecto 1',
      category: 'Desarrollo Web'
    },
    {
      image: 'assets/images/portfolio-2.jpg',
      title: 'Proyecto 2',
      category: 'Aplicación Móvil'
    },
    {
      image: 'assets/images/portfolio-3.jpg',
      title: 'Proyecto 3',
      category: 'Cloud Solution'
    }
  ];

  contactInfo = {
    email: 'gabriel@example.com',
    phone: '+123 456 7890',
    location: 'Ciudad, País'
  };

  isMenuOpen = false;
  activeTab = 'main';
  scrollPosition = 0;

  constructor(private profileService: MockProfileService) {}

  ngOnInit() {
    this.loadProfile();
    this.initializeScrollAnimations();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.scrollPosition = window.scrollY;
    this.updateActiveSection();
  }

  loadProfile() {
    this.profileService.getProfile().subscribe(
      (profile: Profile) => {
        this.profile = profile;
      },
      (error: Error) => {
        console.error('Error loading profile:', error);
      }
    );
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.isMenuOpen = false;
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  private initializeScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observer.observe(element);
    });
  }

  private updateActiveSection() {
    const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
    const currentSection = sections.find((section) => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });

    if (currentSection) {
      this.activeTab = currentSection;
    }
  }

  onSubmitContactForm(event: Event): void {
    event.preventDefault();
    // Implementar lógica de envío del formulario
    console.log('Form submitted');
  }
} 