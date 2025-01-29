import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

/**
 * Allows access to endpoint only if there is logged in user.
 *
 * If there is no logged in user, redirects to /login.
 */
export const authGuard: CanActivateFn = (route, state) => {
	const userService = inject(UserService);
	const router = inject(Router);

	if (userService.user()) {
		return true;
	} else {
		return router.navigate(['login']);
	}
};
