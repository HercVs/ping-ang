import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

/**
 * Allows access to endpoint only if there is no logged in user.
 *
 * If the user is logged in, redirects to /home.
 */
export const notAuthGuard: CanActivateFn = (route, state) => {
	const router: Router = inject(Router);
	const userService: UserService = inject(UserService);

	if (userService.user()) {
		return router.navigate(['/home']);
	} else {
		return true;
	}
};
