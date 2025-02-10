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
import { sleep } from '../../shared/utils/util';

@Component({
	selector: 'app-user-register',
	imports: [ReactiveFormsModule],
	templateUrl: './user-register.component.html',
	styleUrl: './user-register.component.css',
})
export class UserRegisterComponent {
	router = inject(Router);
	userService = inject(UserService);
	registrationError: string = '';
	registrationSuccess: boolean = false;

	registerForm = new FormGroup(
		{
			email: new FormControl('', [Validators.required, Validators.email]),
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

	ngOnInit() {
		this.registrationError = '';
		this.registrationSuccess = false;
	}

	onSubmit(value: any) {
		const user: Credentials = {
			username: value['email'],
			password: value['password'],
		};
		this.userService.registerUser(user).subscribe({
			next: (response) => {
				this.registrationSuccess = true;
				sleep(2000).then(() => {
					this.router.navigate(['/login']);
				});
			},
			error: (response) => {
				this.registrationError = response.error.description;
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
