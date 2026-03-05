import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Seguro } from './services/seguro.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <!-- Navbar: solo visible cuando el usuario está autenticado -->
    <nav class="navbar glass" *ngIf="authService.isLoggedIn()">
      <div class="user-info">
        <span class="avatar">👤</span>
        <div class="user-details">
          <span class="username">{{ authService.getCurrentUser()?.username }}</span>
          <span class="role">{{ authService.getCurrentUser()?.role }}</span>
        </div>
      </div>
      <div class="nav-actions">
        <button *ngIf="authService.isAdmin()" (click)="goToNuevo()" class="btn-action">
          + AÑADIR SEGURO
        </button>
        <button (click)="logout()" class="btn-logout">Cerrar Sesión</button>
      </div>
    </nav>

    <!-- El router renderiza el componente correspondiente a la ruta activa -->
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.css']
})
export class App {
  constructor(public authService: AuthService, private router: Router) { }

  goToNuevo() {
    this.router.navigate(['/seguros/nuevo']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

