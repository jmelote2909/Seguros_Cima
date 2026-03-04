import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeguroFormComponent } from './components/seguro-form/seguro-form.component';
import { SeguroListComponent } from './components/seguro-list/seguro-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SeguroFormComponent, SeguroListComponent, LoginComponent, RegisterComponent, CommonModule],
  template: `
    <div *ngIf="!authService.isLoggedIn()">
      <app-login *ngIf="view === 'login'" (onRegister)="view = 'register'"></app-login>
      <app-register *ngIf="view === 'register'" (onLogin)="view = 'login'"></app-register>
    </div>
    <div *ngIf="authService.isLoggedIn()">
      <nav class="navbar glass">
        <div class="user-info">
          <span class="avatar">👤</span>
          <div class="user-details">
            <span class="username">{{ authService.getCurrentUser()?.username }}</span>
            <span class="role">{{ authService.getCurrentUser()?.role }}</span>
          </div>
        </div>
        <div class="nav-actions">
          <button *ngIf="authService.isAdmin()" (click)="toggleForm()" class="btn-action">
            {{ showForm ? 'Ver Listado' : '+ AÑADIR SEGURO' }}
          </button>
          <button (click)="logout()" class="btn-logout">Cerrar Sesión</button>
        </div>
      </nav>
      
      <main class="main-content">
        <app-seguro-form *ngIf="authService.isAdmin() && showForm" 
          [seguroToEdit]="seguroToEdit" 
          (onCancel)="toggleForm()" 
          (onSubmitSuccess)="toggleForm()">
        </app-seguro-form>
        <app-seguro-list *ngIf="!showForm" (onEdit)="editSeguro($event)"></app-seguro-list>
      </main>
    </div>
  `,
  styleUrls: ['./app.css']
})
export class App {
  showForm = false;
  view: 'login' | 'register' = 'login';
  seguroToEdit: any = null;

  constructor(public authService: AuthService) { }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.seguroToEdit = null;
    }
  }

  editSeguro(seguro: any) {
    this.seguroToEdit = seguro;
    this.showForm = true;
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
