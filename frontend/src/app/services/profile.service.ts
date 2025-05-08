import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Profile {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  github: string;
  linkedin: string;
  twitter: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = `${environment.apiUrl}/profile`;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.apiUrl);
  }

  updateProfile(profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(this.apiUrl, profile);
  }

  uploadAvatar(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('avatar', file);

    return this.http.post<{ url: string }>(`${this.apiUrl}/avatar`, formData);
  }
} 