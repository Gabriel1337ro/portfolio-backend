import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private token: string | null = null;

  constructor(private http: HttpClient) {
    // Verificar si hay un token guardado
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        this.token = savedToken;
        this.isAuthenticatedSubject.next(true);
      }
    }
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('https://portfolio-backend-pq3p.onrender.com/api/auth/login', { username, password })
      .pipe(
        tap(response => {
          this.token = response.token;
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', response.token);
          }
          this.isAuthenticatedSubject.next(true);
        })
      );
  }

  logout(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getToken(): string | null {
    return this.token;
  }
} 