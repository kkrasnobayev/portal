import { Injectable } from '@angular/core';
import { EnvironmentServiceInterface } from './environment.service.interface';
import { Environment, Nullable } from '../../globals/global.types';
import { EnvironmentType, PreferredApps } from '../../globals/global.enums';

@Injectable({ providedIn: 'root' })
export class EnvironmentService implements EnvironmentServiceInterface {
    private readonly env: Environment;

    constructor() {
        this.env = { ...window.ASCENTPORTAL };
    }

    currentEnvironment(): EnvironmentType {
        return this.env.environment;
    }

    getConfiguration(): Environment {
        return this.env;
    }

    isProduction(): boolean {
        return this.env.environment === EnvironmentType.production;
    }

    getPreferredAppUrl(preferredApp?: PreferredApps): Nullable<string> {
        if (!preferredApp) return null;

        switch (preferredApp.toLowerCase()) {
            case PreferredApps.om:
                return this.env.omHomeUri;
            case PreferredApps.essentials:
                return this.env.essentialsHomeUri;
            default:
                return null;
        }
    }
}
