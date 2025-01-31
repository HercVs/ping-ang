import { Component, inject } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-landing-page',
	imports: [],
	templateUrl: './landing-page.component.html',
	styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
	router: Router = inject(Router);
	userService: UserService = inject(UserService);
}
