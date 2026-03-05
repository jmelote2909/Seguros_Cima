import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
    // Rutas públicas
    {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
    },

    // Rutas protegidas (requiere autenticación)
    {
        path: 'seguros',
        loadComponent: () => import('./components/seguro-list/seguro-list.component').then(m => m.SeguroListComponent),
        canActivate: [authGuard]
    },

    // Ruta protegida (requiere ser admin)
    {
        path: 'seguros/nuevo',
        loadComponent: () => import('./components/seguro-form/seguro-form.component').then(m => m.SeguroFormComponent),
        canActivate: [authGuard, adminGuard]
    },

    // Redirección por defecto
    { path: '', redirectTo: 'seguros', pathMatch: 'full' },
    { path: '**', redirectTo: 'seguros' }
];
