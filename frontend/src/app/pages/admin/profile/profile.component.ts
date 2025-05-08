import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProfileService } from '../../../services/profile.service';
import { Profile } from '../../../models/profile.model';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ProfileAdminComponent implements OnInit {
  profile: Profile;
  heroImagePreview: string;
  aboutImagePreview: string;
  heroImageFile: File | null = null;
  aboutImageFile: File | null = null;

  constructor(private profileService: ProfileService) {
    this.profile = {
      name: '',
      title: '',
      description: '',
      email: '',
      location: '',
      phone: '',
      heroImage: '',
      aboutImage: '',
      socialLinks: {
        github: '',
        linkedin: '',
        twitter: '',
        instagram: ''
      }
    };
    this.heroImagePreview = '';
    this.aboutImagePreview = '';
  }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(profile => {
      this.profile = { ...profile };
      this.heroImagePreview = profile.heroImage;
      this.aboutImagePreview = profile.aboutImage;
    });
  }

  onHeroImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.heroImageFile = file;
      this.createImagePreview(file, 'hero');
    }
  }

  onAboutImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.aboutImageFile = file;
      this.createImagePreview(file, 'about');
    }
  }

  private createImagePreview(file: File, type: 'hero' | 'about'): void {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (type === 'hero') {
        this.heroImagePreview = e.target?.result as string;
      } else {
        this.aboutImagePreview = e.target?.result as string;
      }
    };
    reader.readAsDataURL(file);
  }

  saveProfile(): void {
    // Aquí podrías implementar la lógica para subir las imágenes a un servidor
    // Por ahora, solo actualizamos las URLs de las imágenes
    if (this.heroImageFile) {
      this.profile.heroImage = this.heroImagePreview;
    }
    if (this.aboutImageFile) {
      this.profile.aboutImage = this.aboutImagePreview;
    }

    this.profileService.updateProfile(this.profile);
    alert('Profile updated successfully!');
  }
} 