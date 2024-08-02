import { inject, Injectable } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { AuthUser, Nullable } from '../globals/global.types';
import { map, Observable, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    private user: Nullable<User> = null;

    private authService: AuthService = inject(AuthService);

    getUserSecure(): Observable<User> {
        return this.getUser().pipe(
            map((user: Nullable<User>) => {
                if (!user) {
                    throw new Error(
                        'User is not authenticated. Make sure you route is protected with AUTHENTICATED_USER_ROUTE_GUARD',
                    );
                }

                return user;
            }),
        );
    }

    getUser(): Observable<Nullable<User>> {
        if (this.user) {
            return of(this.user);
        }

        return this.authService.user$.pipe(
            switchMap((user: AuthUser) => {
                this.user = user ?? null;
                return of(this.user);
            }),
        );
    }
}
