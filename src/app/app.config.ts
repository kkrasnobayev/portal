import { ApplicationConfig, importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, TitleStrategy, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { CustomTitleStrategy } from './components/strategies/custom-title.strategy';
import { FlagBasedPreloadingStrategy } from './components/strategies/flag-based-preloading.strategy';
import { AuthModule } from '@auth0/auth0-angular';
import { EnvironmentService } from './services/environment/environment.service';
import { Environment } from './globals/global.types';

const environmentConfig: Environment = new EnvironmentService().getConfiguration();

export const appConfig: ApplicationConfig = {
    providers: [
        provideExperimentalZonelessChangeDetection(),
        { provide: TitleStrategy, useClass: CustomTitleStrategy },
        provideRouter(routes, withPreloading(FlagBasedPreloadingStrategy)),
        importProvidersFrom(
            AuthModule.forRoot({
                domain: environmentConfig.domain,
                clientId: environmentConfig.clientId,
                authorizationParams: {
                    redirect_uri: environmentConfig.redirectUri,
                    audience: environmentConfig.audience,
                },
            }),
        ),
    ],
};
