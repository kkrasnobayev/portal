import { EnvironmentType } from './global.enums';

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

/*
 * "any" is required here because as a standard GenericCollection consists of key->value pairs with disabled typing for value
 * GenericCollection without typing should be used only when we don't know or care about actual typing
 */
/* eslint-disable  @typescript-eslint/no-explicit-any */
export type GenericCollection<T = any> = Record<string, T>;
export type Nullable<T> = T | null;
export type Maybe<T> = T | undefined;
