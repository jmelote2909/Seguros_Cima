import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    private authService = inject(AuthService);
    private router = inject(Router);

    registerData = {
        username: '',
        password: '',
        confirmPassword: ''
    };

    error = '';
    loading = false;

    goToLogin() {
        this.router.navigate(['/login']);
    }

    onSubmit() {
        if (this.registerData.password !== this.registerData.confirmPassword) {
            this.error = 'Las contraseñas no coinciden';
            return;
        }

        if (this.registerData.username.length < 3) {
            this.error = 'El usuario debe tener al menos 3 caracteres';
            return;
        }

        this.loading = true;
        this.error = '';

        this.authService.register({
            username: this.registerData.username,
            password: this.registerData.password
        }).subscribe({
            next: () => {
                this.router.navigate(['/login']);
            },
            error: (err) => {
                this.error = err.error || 'Error al registrar el usuario';
                this.loading = false;
            }
        });
    }
}
