import { Component, inject } from '@angular/core';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
	AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { Credentials } from '../../shared/interfaces/backend';

@Component({
	selector: 'app-user-register',
	imports: [ReactiveFormsModule],
	templateUrl: './user-register.component.html',
	styleUrl: './user-register.component.css',
})
export class UserRegisterComponent {
	router = inject(Router);
	userService = inject(UserService);

	registerForm = new FormGroup(
		{
			email: new FormControl('', [Validators.required, Validators.email]),
			// Validators.email allows emails like test@gmail
			// TODO should be replaced with pattern that also requires ".com"
			password: new FormControl('', [
				Validators.required,
				Validators.pattern(
					'^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\\d)(?=.*?[@$!%*?&]).{8,}$',
				),
			]),
			confirmPassword: new FormControl('', [Validators.required]),
		},
		this.validatePasswordConfirmPasswordMatch,
	);

	onSubmit(value: any) {
		const user: Credentials = {
			username: value['email'],
			password: value['password'],
		};
		this.userService.registerUser(user).subscribe({
			next: (response) => {
				console.log('Successfully registered', response);
				this.router.navigate(['']);
				// TODO registration success pop-up
			},
			error: (response) => {
				console.log(response.error.description);
				// TODO check if email exists when clicking off (blur)="" email field instead
			},
		});
	}

	validatePasswordConfirmPasswordMatch(
		control: AbstractControl,
	): { [key: string]: boolean } | null {
		if (
			control.get('password')?.value &&
			control.get('confirmPassword')?.value &&
			control.get('password')?.value !== control.get('confirmPassword')?.value
		) {
			return { passwordMismatch: true };
		}
		return null;
	}
}
