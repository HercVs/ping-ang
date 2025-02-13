import { Component, inject } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
	selector: 'app-landing-page',
	imports: [CarouselComponent],
	templateUrl: './landing-page.component.html',
	styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
	router: Router = inject(Router);
	userService: UserService = inject(UserService);
}
