import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    @Output() onRegister = new EventEmitter<void>();
    loginForm: FormGroup;
    error: string | null = null;
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.isLoading = true;
            this.error = null;
            this.authService.login(this.loginForm.value).subscribe({
                next: () => {
                    this.isLoading = false;
                    window.location.reload(); // Refresh to update view state
                },
                error: (err) => {
                    this.isLoading = false;
                    this.error = 'Credenciales incorrectas';
                    console.error('Login failed', err);
                }
            });
        }
    }
}
