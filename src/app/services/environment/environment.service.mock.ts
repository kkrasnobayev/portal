import { EnvironmentServiceInterface } from './environment.service.interface';
import { EnvironmentType } from '../../globals/global.enums';
import { Environment, Nullable } from '../../globals/global.types';

export class EnvironmentServiceMock implements EnvironmentServiceInterface {
    currentEnvironment(): EnvironmentType {
        return EnvironmentType.testing;
    }

    getConfiguration(): Environment {
        return {
            audience: 'http://test/api/v1/',
            clientId: '1234',
            domain: 'test.provider.domain',
            environment: EnvironmentType.testing,
            loggedOutUri: 'http://test/logged-out',
            redirectUri: 'http://test/callback',
            omHomeUri: '',
            essentialsHomeUri: '',
        };
    }

    isProduction(): boolean {
        return false;
    }

    getPreferredAppUrl(): Nullable<string> {
        return null;
    }
}
