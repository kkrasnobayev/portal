import { CanActivateFn, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { inject } from '@angular/core';

import { AuthUser } from '../../globals/global.types';
import { UserService } from '../../services/user.service';

export const GUEST_USER_ROUTE_GUARD: CanActivateFn = () => {
    const userService: UserService = inject(UserService);
    const router: Router = inject(Router);
    return userService.getUser().pipe(
        switchMap((user: AuthUser) => {
            if (user) {
                router.navigate(['/']).then();
                return of(false);
            }

            return of(true);
        }),
    );
};
