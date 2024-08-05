import { CanActivateFn } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { User } from '@auth0/auth0-angular';
import { UserService } from '../../services/user.service';
import { EnvironmentService } from '../../services/environment/environment.service';
import { APPLICATIONS_NAMESPACE } from '../../globals/global.constants';
import { Nullable } from '../../globals/global.types';

export const HOME_PAGE_USER_ROUTE_GUARD: CanActivateFn = () => {
    const userService: UserService = inject(UserService);
    const environmentService: EnvironmentService = inject(EnvironmentService);

    /**
     * get logged in user
     */
    return userService.getUserSecure().pipe(
        switchMap((user: User) => {
            /**
             * get preferred url, if possible
             */
            const url: Nullable<string> = environmentService.getPreferredAppUrl(
                user[APPLICATIONS_NAMESPACE + 'preferredApp'],
            );

            /**
             * if the url is found - navigate to it;
             * otherwise continue with the route
             */
            if (url) {
                window.location.href = url;
                return of(false);
            }
            return of(true);
        }),
    );
};
