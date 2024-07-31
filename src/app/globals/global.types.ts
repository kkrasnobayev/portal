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

/* eslint-disable  @typescript-eslint/no-explicit-any */
export type GenericCollection<T = any> = Record<string, T>;
export type Nullable<T> = T | null;
export type Maybe<T> = T | undefined;
