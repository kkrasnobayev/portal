import { CanActivateFn } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { User } from '@auth0/auth0-angular';
import { UserService } from '../../services/user.service';
import { EnvironmentService } from '../../services/environment/environment.service';
import { NAMESPACE } from '../../globals/global.constants';
import { Nullable } from '../../globals/global.types';

export const HOME_PAGE_USER_ROUTE_GUARD: CanActivateFn = () => {
    const userService: UserService = inject(UserService);
    const environmentService: EnvironmentService = inject(EnvironmentService);
    return userService.getUserSecure().pipe(
        switchMap((user: User) => {
            const url: Nullable<string> = environmentService.getPreferredAppUrl(user[NAMESPACE + 'preferredApp']);

            if (url) {
                window.location.href = url;
                return of(false);
            }
            return of(true);
        }),
    );
};
