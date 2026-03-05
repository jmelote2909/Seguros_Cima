import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;
    error: string | null = null;
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    goToRegister() {
        this.router.navigate(['/register']);
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.isLoading = true;
            this.error = null;
            this.authService.login(this.loginForm.value).subscribe({
                next: () => {
                    this.isLoading = false;
                    this.router.navigate(['/seguros']);
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
