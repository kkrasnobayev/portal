import { CanActivateFn } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AuthUser } from '../../globals/global.types';
import { UserService } from '../../services/user.service';

export const REDIRECT_PAGE_USER_ROUTE_GUARD: CanActivateFn = (route) => {
    const authService: AuthService = inject(AuthService);
    const userService: UserService = inject(UserService);

    /**
     * get user if available
     */
    return userService.getUser().pipe(
        switchMap((user: AuthUser) => {
            /**
             * if user is logged in - redirect to log-out
             */
            if (user) {
                authService.logout();
                return of(false);
            }

            /**
             * if user is not logged in but the query contains param "success", equal to "true"
             * redirect to log-in
             */
            if (route.queryParams['success'] === 'true') {
                authService.loginWithRedirect();
                return of(false);
            }

            /**
             * otherwise continue with the route
             */
            return of(true);
        }),
    );
};
