import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, MatToolbarModule, MatButtonModule, CommonModule],
  template: `
    <mat-toolbar color="primary">
      <span>Gabb1337</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/">Inicio</button>
      <button mat-button routerLink="/profile">Perfil</button>
      <button mat-button routerLink="/projects">Proyectos</button>
      <button mat-button routerLink="/contact">Contacto</button>
      <ng-container *ngIf="isAuthenticated$ | async">
        <button mat-button routerLink="/admin">Admin</button>
        <button mat-button (click)="logout()">Cerrar Sesión</button>
      </ng-container>
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
  `]
})
export class NavbarComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated();
  }

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
} 