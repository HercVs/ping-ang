import {
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { UserService } from './user.service';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
	userService = inject(UserService);
	router = inject(Router);
	ignoreFutureRequests: boolean = false;

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		/**
		 * If it's an auth request process it and future requests.
		 */
		if (this.userService.isAuthRequest(req)) {
			this.ignoreFutureRequests = false;
			return next.handle(req);
		}

		/**
		 * If either user or token is missing, reset both to null and prompt
		 * client to login. Ignore further requests until an auth request
		 * is processed.
		 */
		if (!this.userService.getJwtToken() || !this.userService.user()) {
			this.ignoreFutureRequests = true;
			this.userService.logoutUser();
		}

		/**
		 * If JWT token is expired, reset user & token to null and prompt
		 * client to login. Ignore further requests until an auth request
		 * is processed.
		 */
		const authToken = this.userService.getJwtToken();
		if (authToken) {
			const decodedToken = jwtDecode(authToken);
			if (this.userService.isTokenExpired(decodedToken)) {
				this.userService.logoutUser({ errorCode: 'TokenExpired' });
				this.ignoreFutureRequests = true;
			}
		}

		/**
		 * Stop processing current request if ignoreFutureRequests is set to
		 * true at any point while processing current or previous request.
		 */
		if (this.ignoreFutureRequests) {
			return EMPTY;
		}

		/**
		 * Attach auth header in request clone and finish processing it.
		 */
		const authRequest = req.clone({
			headers: req.headers.set('Authorization', 'Bearer ' + authToken),
		});
		return next.handle(authRequest);
	}
}
