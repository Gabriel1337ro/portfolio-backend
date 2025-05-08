import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile.model';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  template: `
    <div class="profile-container">
      <mat-card class="profile-card">
        <div class="profile-header">
          <img [src]="profile?.heroImage || 'assets/default-avatar.png'" alt="Profile Image" class="profile-image">
          <div class="profile-info">
            <h1>{{ profile?.name }}</h1>
            <h2>{{ profile?.title }}</h2>
            <p>{{ profile?.description }}</p>
          </div>
        </div>

        <div class="profile-details">
          <div class="contact-info">
            <p><mat-icon>email</mat-icon> {{ profile?.email }}</p>
            <p><mat-icon>phone</mat-icon> {{ profile?.phone }}</p>
            <p><mat-icon>location_on</mat-icon> {{ profile?.location }}</p>
          </div>

          <div class="social-links">
            <a *ngIf="profile?.socialLinks?.github" [href]="profile?.socialLinks?.github" target="_blank">
              <mat-icon>code</mat-icon>
            </a>
            <a *ngIf="profile?.socialLinks?.linkedin" [href]="profile?.socialLinks?.linkedin" target="_blank">
              <mat-icon>business</mat-icon>
            </a>
            <a *ngIf="profile?.socialLinks?.twitter" [href]="profile?.socialLinks?.twitter" target="_blank">
              <mat-icon>chat</mat-icon>
            </a>
          </div>
        </div>

        <div *ngIf="isAdmin$ | async" class="edit-section">
          <h3>Edit Profile</h3>
          <form (ngSubmit)="onSubmit()" #profileForm="ngForm">
            <mat-form-field>
              <mat-label>Name</mat-label>
              <input matInput [(ngModel)]="editedProfile.name" name="name" required>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Title</mat-label>
              <input matInput [(ngModel)]="editedProfile.title" name="title" required>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Description</mat-label>
              <textarea matInput [(ngModel)]="editedProfile.description" name="description" required></textarea>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Email</mat-label>
              <input matInput [(ngModel)]="editedProfile.email" name="email" required type="email">
            </mat-form-field>

            <mat-form-field>
              <mat-label>Phone</mat-label>
              <input matInput [(ngModel)]="editedProfile.phone" name="phone" required>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Location</mat-label>
              <input matInput [(ngModel)]="editedProfile.location" name="location" required>
            </mat-form-field>

            <div class="social-inputs">
              <mat-form-field>
                <mat-label>GitHub</mat-label>
                <input matInput [(ngModel)]="editedProfile.socialLinks.github" name="github">
              </mat-form-field>

              <mat-form-field>
                <mat-label>LinkedIn</mat-label>
                <input matInput [(ngModel)]="editedProfile.socialLinks.linkedin" name="linkedin">
              </mat-form-field>

              <mat-form-field>
                <mat-label>Twitter</mat-label>
                <input matInput [(ngModel)]="editedProfile.socialLinks.twitter" name="twitter">
              </mat-form-field>
            </div>

            <div class="image-upload">
              <input type="file" (change)="onFileSelected($event)" accept="image/*">
              <button mat-button type="button" (click)="uploadImage()" [disabled]="!selectedFile">
                Upload Image
              </button>
            </div>

            <button mat-raised-button color="primary" type="submit" [disabled]="!profileForm.form.valid">
              Save Changes
            </button>
          </form>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .profile-card {
      padding: 2rem;
    }

    .profile-header {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .profile-image {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
    }

    .profile-info {
      flex: 1;
    }

    .profile-info h1 {
      margin: 0;
      font-size: 2rem;
      color: var(--primary-color);
    }

    .profile-info h2 {
      margin: 0.5rem 0;
      font-size: 1.2rem;
      color: var(--secondary-color);
    }

    .profile-details {
      margin-top: 2rem;
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .contact-info p {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0;
    }

    .social-links {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .social-links a {
      color: var(--primary-color);
      text-decoration: none;
    }

    .edit-section {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid var(--border-color);
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .social-inputs {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .image-upload {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 1rem 0;
    }

    @media (max-width: 600px) {
      .profile-header {
        flex-direction: column;
        text-align: center;
      }

      .profile-image {
        width: 120px;
        height: 120px;
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  profile: Profile | null = null;
  editedProfile: Profile = {
    name: '',
    title: '',
    description: '',
    email: '',
    phone: '',
    location: '',
    heroImage: '',
    aboutImage: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      instagram: ''
    }
  };
  selectedFile: File | null = null;
  isAdmin$: Observable<boolean>;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) {
    this.isAdmin$ = this.authService.isAuthenticated();
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.profileService.getProfile().subscribe(profile => {
      this.profile = profile;
      this.editedProfile = { ...profile };
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  uploadImage() {
    if (this.selectedFile) {
      this.profileService.uploadImage(this.selectedFile).subscribe(
        response => {
          if (this.editedProfile) {
            this.editedProfile.heroImage = response.imageUrl;
          }
          this.selectedFile = null;
        },
        error => console.error('Error uploading image:', error)
      );
    }
  }

  onSubmit() {
    if (this.editedProfile) {
      this.profileService.updateProfile(this.editedProfile).subscribe(
        updatedProfile => {
          this.profile = updatedProfile;
          this.editedProfile = { ...updatedProfile };
        },
        error => console.error('Error updating profile:', error)
      );
    }
  }
} 