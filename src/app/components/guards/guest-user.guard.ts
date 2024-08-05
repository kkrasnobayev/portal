import { CanActivateFn, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { inject } from '@angular/core';

import { AuthUser } from '../../globals/global.types';
import { UserService } from '../../services/user.service';

export const GUEST_USER_ROUTE_GUARD: CanActivateFn = () => {
    const userService: UserService = inject(UserService);
    const router: Router = inject(Router);
    return userService.getUser().pipe(
        /**
         * if user is authenticated - redirect to the home page, which will then redirect to
         * the corresponding application;
         * otherwise - let the route pass
         */
        switchMap((user: AuthUser): Observable<boolean> => {
            if (user) {
                router.navigate([]).then();
                return of(false);
            }

            return of(true);
        }),
    );
};
