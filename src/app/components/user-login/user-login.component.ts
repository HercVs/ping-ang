import { Component, inject } from '@angular/core';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
	Credentials,
	CustomJwtPayload,
	User,
} from '../../shared/interfaces/backend';
import { UserService } from '../../shared/services/user.service';
import { jwtDecode } from 'jwt-decode';
import { NgSwitch, NgSwitchCase } from '@angular/common';

@Component({
	selector: 'app-user-login',
	imports: [ReactiveFormsModule, NgSwitch, NgSwitchCase],
	templateUrl: './user-login.component.html',
	styleUrl: './user-login.component.css',
})
export class UserLoginComponent {
	router = inject(Router);
	userService = inject(UserService);
	errorCode: string | undefined = history?.state.errorCode;

	loginForm = new FormGroup({
		// TODO defaults to pass validators for testing - Remove
		username: new FormControl('test@gmail.com', [
			Validators.required,
			Validators.email,
		]),
		password: new FormControl('Test123!', [Validators.required]),
	});

	onSubmit() {
		const credentials = this.loginForm.value as Credentials;
		this.userService.loginUser(credentials).subscribe({
			next: (response) => {
				const jwt = response.token;
				localStorage.setItem('token', jwt);
				const user: User = {
					username: jwtDecode<CustomJwtPayload>(jwt).sub as unknown as string,
					id: jwtDecode<CustomJwtPayload>(jwt).uid as unknown as string,
				};
				this.userService.user.set(user);
				this.router.navigate(['home']);
			},
			error: (err) => {
				this.errorCode = err.error.code;
				this.loginForm.get('password')?.reset();
			},
		});
	}
}
