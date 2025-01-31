import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Credentials, CustomJwtPayload, User } from '../interfaces/backend';
import { jwtDecode } from 'jwt-decode';

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
			const decodedUsername = decodedToken.sub as unknown as string;
			const decodedId = decodedToken.uid as unknown as string;

			this.user.set({
				username: decodedUsername,
				id: decodedId,
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

	logoutUser() {
		this.user.set(null);
		localStorage.removeItem('token');
		this.router.navigate(['']);
	}
}
