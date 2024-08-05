import { EnvironmentType } from './global.enums';
import { User } from '@auth0/auth0-angular';
import { Route } from '@angular/router';

export interface Environment {
    audience: string;
    clientId: string;
    domain: string;
    omHomeUri: string;
    essentialsHomeUri: string;
    environment: EnvironmentType;
    loggedOutUri?: string;
    redirectUri?: string;
}

export interface AppRouteData {
    preload?: true; // the route will be eagerly loaded after all the required routes
    showPreloader?: true; // the preloader will be shown while the route is being loaded/resolved
    translocoScopes?: string[]; // array of transloco scopes that are needed within the route for translation
}

export type AppRoute = Omit<Route, 'data' | 'children'> & {
    data?: AppRouteData;
    children?: AppRoute[];
};

/*
 * "any" is required here because as a standard GenericCollection consists of key->value pairs with disabled typing for value
 * GenericCollection without typing should be used only when we don't know or care about actual typing
 */
/* eslint-disable  @typescript-eslint/no-explicit-any */
export type GenericCollection<T = any> = Record<string, T>;
export type Nullable<T> = T | null;
export type Maybe<T> = T | undefined;

export type AuthUser = User | null | undefined;
