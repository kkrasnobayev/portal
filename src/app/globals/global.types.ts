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

export type GenericCollection<T = string> = Record<string, T>;
export type Nullable<T> = T | null;
export type Maybe<T> = T | undefined;
