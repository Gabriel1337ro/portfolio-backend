import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="sidenav.toggle()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Gabb1337</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/">Home</button>
      <button mat-button routerLink="/projects">Projects</button>
      <button mat-button routerLink="/about">About</button>
      <button mat-button routerLink="/contact">Contact</button>
    </mat-toolbar>

    <mat-sidenav-container>
      <mat-sidenav #sidenav mode="side">
        <mat-nav-list>
          <a mat-list-item routerLink="/" (click)="sidenav.close()">Home</a>
          <a mat-list-item routerLink="/projects" (click)="sidenav.close()">Projects</a>
          <a mat-list-item routerLink="/about" (click)="sidenav.close()">About</a>
          <a mat-list-item routerLink="/contact" (click)="sidenav.close()">Contact</a>
        </mat-nav-list>
      </mat-sidenav>
    </mat-sidenav-container>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    mat-sidenav-container {
      height: calc(100vh - 64px);
    }
    mat-sidenav {
      width: 200px;
    }
  `]
})
export class HeaderComponent {
  constructor(private router: Router) {}
} 