import { EnvironmentType } from '../../globals/global.enums';
import { Environment, Nullable } from '../../globals/global.types';

export interface EnvironmentServiceInterface {
    currentEnvironment(): EnvironmentType;

    getConfiguration(): Environment;

    isProduction(): boolean;

    getPreferredAppUrl(): Nullable<string>;
}
