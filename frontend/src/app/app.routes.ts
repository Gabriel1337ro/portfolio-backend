import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProfileAdminComponent } from './pages/admin/profile/profile-admin.component';
import { ProjectsAdminComponent } from './pages/admin/projects/projects-admin.component';
import { SkillsAdminComponent } from './pages/admin/skills/skills-admin.component';
import { MessagesAdminComponent } from './pages/admin/messages/messages-admin.component';
import { AuthService } from './services/auth.service';

const authGuard = (authService: AuthService) => {
  return () => {
    if (authService.isAuthenticated()) {
      return true;
    }
    return false;
  };
};

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: ProfileAdminComponent },
      { path: 'projects', component: ProjectsAdminComponent },
      { path: 'skills', component: SkillsAdminComponent },
      { path: 'messages', component: MessagesAdminComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
