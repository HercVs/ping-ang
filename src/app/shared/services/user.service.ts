import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Credentials, User } from '../interfaces/backend';

const API_URL = `${environment.apiURL}/api/users`;

@Injectable({
	providedIn: 'root',
})
export class UserService {
	http: HttpClient = inject(HttpClient);
	router: Router = inject(Router);

	constructor() {}

	registerUser(user: User) {
		return this.http.post(`${API_URL}/insert`, user);
	}
}
