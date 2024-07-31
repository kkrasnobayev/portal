import { EnvironmentService } from './environment.service';
import { EnvironmentType, PreferredApps } from '../../globals/global.enums';
import '../../globals/globals';

describe('EnvironmentService', () => {
    beforeEach(async () => {
        window.ASCENTPORTAL = {
            essentialsHomeUri: 'http://test/essentials',
            omHomeUri: 'http://test/home',
            audience: 'http://test/audience',
            domain: 'test.provider.domain',
            clientId: '12345',
            environment: EnvironmentType.testing,
            loggedOutUri: 'http://test/logged-out',
            redirectUri: 'http://test/callback',
        };
    });

    it('should get current environment name', () => {
        const environmentService: EnvironmentService = new EnvironmentService();
        expect(environmentService.currentEnvironment()).toEqual(EnvironmentType.testing);
    });

    it('should get current environment configuration', () => {
        const config = { ...window.ASCENTPORTAL };

        const environmentService = new EnvironmentService();
        expect(environmentService.getConfiguration()).toEqual(config);
    });

    it('should get production status', () => {
        const environmentService = new EnvironmentService();
        expect(environmentService.isProduction()).toBeFalse();
    });

    it('should get preferred url', () => {
        const environmentService = new EnvironmentService();
        expect(environmentService.getPreferredAppUrl(PreferredApps.essentials)).toEqual(
            window.ASCENTPORTAL.essentialsHomeUri,
        );
    });
});
