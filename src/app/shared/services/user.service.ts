import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Credentials, CustomJwtPayload, User } from '../interfaces/backend';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { HttpRequest } from '@angular/common/http';

const API_URL = `${environment.apiURL}/api`;

@Injectable({
	providedIn: 'root',
})
export class UserService {
	http: HttpClient = inject(HttpClient);
	router: Router = inject(Router);

	user = signal<User | null>(null);

	constructor() {
		const jwtToken = localStorage.getItem('token');
		if (jwtToken) {
			const decodedToken = jwtDecode<CustomJwtPayload>(jwtToken);

			this.user.set({
				username: decodedToken.sub as unknown as string,
				id: decodedToken.uid as unknown as string,
			});
		}
	}

	registerUser(credentials: Credentials) {
		return this.http.post<{ user: User }>(
			`${API_URL}/users/insert`,
			credentials,
		);
	}

	loginUser(credentials: Credentials) {
		return this.http.post<{ token: string }>(
			`${API_URL}/auth/authenticate`,
			credentials,
		);
	}

	logoutUser(error: object | undefined = undefined) {
		this.user.set(null);
		localStorage.removeItem('token');
		this.router.navigate(['/login'], {
			state: error,
		});
	}

	getJwtToken(): string | null {
		return localStorage.getItem('token');
	}

	isTokenExpired(jwtToken: JwtPayload): boolean {
		return jwtToken.exp ? jwtToken.exp < Date.now() / 1000 : true;
	}

	isLoginRequest(req: HttpRequest<any>): boolean {
		return req.url.endsWith('/api/auth/authenticate');
	}
}
