import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatBadgeModule
  ],
  template: `
    <div class="admin-container">
      <mat-toolbar color="primary">
        <button mat-icon-button (click)="sidenav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span>Panel de Administración</span>
        <span class="toolbar-spacer"></span>
        <button mat-icon-button (click)="logout()">
          <mat-icon>logout</mat-icon>
        </button>
      </mat-toolbar>

      <mat-sidenav-container>
        <mat-sidenav #sidenav mode="side" opened>
          <mat-nav-list>
            <a mat-list-item routerLink="profile" routerLinkActive="active">
              <mat-icon matListItemIcon>person</mat-icon>
              <span matListItemTitle>Perfil</span>
            </a>
            <a mat-list-item routerLink="projects" routerLinkActive="active">
              <mat-icon matListItemIcon>work</mat-icon>
              <span matListItemTitle>Proyectos</span>
            </a>
            <a mat-list-item routerLink="skills" routerLinkActive="active">
              <mat-icon matListItemIcon>code</mat-icon>
              <span matListItemTitle>Habilidades</span>
            </a>
            <a mat-list-item routerLink="messages" routerLinkActive="active">
              <mat-icon matListItemIcon>mail</mat-icon>
              <span matListItemTitle>Mensajes</span>
              <span matListItemMeta *ngIf="unreadCount$ | async as count" [matBadge]="count" matBadgeColor="warn"></span>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content>
          <div class="content">
            <router-outlet></router-outlet>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .admin-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    mat-toolbar {
      background-color: #112240;
      color: #ccd6f6;
    }

    .toolbar-spacer {
      flex: 1 1 auto;
    }

    mat-sidenav-container {
      flex: 1;
      background-color: #0a192f;
    }

    mat-sidenav {
      width: 250px;
      background-color: #112240;
      border-right: 1px solid #233554;
    }

    mat-nav-list {
      padding-top: 20px;

      a {
        color: #8892b0;
        margin: 8px 16px;
        border-radius: 4px;

        &:hover {
          background-color: rgba(100, 255, 218, 0.1);
        }

        &.active {
          color: #64ffda;
          background-color: rgba(100, 255, 218, 0.1);
        }

        mat-icon {
          color: inherit;
        }
      }
    }

    .content {
      padding: 20px;
      height: 100%;
      overflow-y: auto;
    }

    @media (max-width: 768px) {
      mat-sidenav {
        width: 200px;
      }
    }
  `]
})
export class AdminComponent implements OnInit {
  unreadCount$: Observable<number>;

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.unreadCount$ = this.messageService.getUnreadCount();
  }

  ngOnInit() {
    // Verificar autenticación al iniciar
    if (!this.authService.isAuthenticated()) {
      this.authService.logout();
    }
  }

  logout() {
    this.authService.logout();
  }
} 