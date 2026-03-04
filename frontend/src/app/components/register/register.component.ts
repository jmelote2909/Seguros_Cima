import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    private authService = inject(AuthService);

    @Output() onLogin = new EventEmitter<void>();

    registerData = {
        username: '',
        password: '',
        confirmPassword: ''
    };

    error = '';
    loading = false;

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
                this.onLogin.emit();
            },
            error: (err) => {
                this.error = err.error || 'Error al registrar el usuario';
                this.loading = false;
            }
        });
    }
}
