import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Usuario {
    id?: number;
    username: string;
    role: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api';
    private currentUserKey = 'currentUser';

    constructor(private http: HttpClient) { }

    login(credentials: { username: string, password: string }): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.apiUrl}/login`, credentials).pipe(
            tap(user => localStorage.setItem(this.currentUserKey, JSON.stringify(user)))
        );
    }

    register(userData: { username: string, password: string }): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.apiUrl}/register`, userData);
    }

    logout() {
        localStorage.removeItem(this.currentUserKey);
    }

    getCurrentUser(): Usuario | null {
        const user = localStorage.getItem(this.currentUserKey);
        return user ? JSON.parse(user) : null;
    }

    isLoggedIn(): boolean {
        return this.getCurrentUser() !== null;
    }

    isAdmin(): boolean {
        const user = this.getCurrentUser();
        return user?.role === 'ADMIN';
    }
}
