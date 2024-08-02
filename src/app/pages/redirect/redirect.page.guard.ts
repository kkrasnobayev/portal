import { CanActivateFn } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AuthUser } from '../../globals/global.types';
import { UserService } from '../../services/user.service';

export const REDIRECT_PAGE_USER_ROUTE_GUARD: CanActivateFn = (route) => {
    const authService: AuthService = inject(AuthService);
    const userService: UserService = inject(UserService);

    return userService.getUser().pipe(
        switchMap((user: AuthUser) => {
            if (user) {
                authService.logout();
                return of(false);
            }

            if (route.queryParams['success'] === 'true') {
                authService.loginWithRedirect();
                return of(false);
            }

            return of(true);
        }),
    );
};
