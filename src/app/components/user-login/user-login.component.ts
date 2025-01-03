import { Component, inject } from '@angular/core';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-user-login',
	imports: [ReactiveFormsModule],
	templateUrl: './user-login.component.html',
	styleUrl: './user-login.component.css',
})
export class UserLoginComponent {
	router = inject(Router);

	loginForm = new FormGroup({
		// TODO defaults to pass validators for testing - Remove
		email: new FormControl('a@a', [Validators.required, Validators.email]),
		password: new FormControl('a', [Validators.required]),
	});

	onSubmit() {
		// TODO backend required
		this.router.navigate(['home']);
	}
}
