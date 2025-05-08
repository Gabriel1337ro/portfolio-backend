import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class MockProfileService {
  private mockProfile: Profile = {
    name: 'Gabriel',
    title: 'Full Stack Developer',
    description: 'I create modern and responsive web applications with the latest technologies.',
    email: 'your.email@example.com',
    location: 'Your Location',
    phone: '+1 234 567 890',
    heroImage: 'assets/images/hero-image.png',
    aboutImage: 'assets/images/about-image.jpg',
    socialLinks: {
      github: '#',
      linkedin: '#',
      twitter: '#',
      instagram: '#'
    }
  };

  getProfile(): Observable<Profile> {
    return of(this.mockProfile);
  }

  updateProfile(profile: Profile): Observable<Profile> {
    this.mockProfile = { ...profile };
    return of(this.mockProfile);
  }

  uploadImage(file: File): Observable<{ url: string }> {
    // Simular una URL de imagen
    const mockUrl = `assets/images/${file.name}`;
    return of({ url: mockUrl });
  }
} 