import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAdmin()) {
        return true;
    }

    // Si no es admin, redirige a la lista (página principal)
    return router.createUrlTree(['/seguros']);
};
