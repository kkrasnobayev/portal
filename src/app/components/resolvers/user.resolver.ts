import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { inject } from '@angular/core';
import { AuthUser } from '../../globals/global.types';

export const USER_RESOLVER_FN: ResolveFn<AuthUser> = (): Observable<AuthUser> => {
    return inject(AuthService).user$;
};
