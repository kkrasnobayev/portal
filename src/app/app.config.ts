import { ApplicationConfig, importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, TitleStrategy, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { CustomTitleStrategy } from './components/strategies/custom-title.strategy';
import { FlagBasedPreloadingStrategy } from './components/strategies/flag-based-preloading.strategy';
import { AuthModule } from '@auth0/auth0-angular';
import { EnvironmentService } from './services/environment/environment.service';
import { Environment } from './globals/global.types';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoLoaderService } from './services/transloco-loader.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Languages } from './globals/global.enums';

const envService = new EnvironmentService();
const envConfig: Environment = envService.getConfiguration();

export const appConfig: ApplicationConfig = {
    providers: [
        provideExperimentalZonelessChangeDetection(),
        { provide: TitleStrategy, useClass: CustomTitleStrategy },
        provideRouter(routes, withPreloading(FlagBasedPreloadingStrategy)),
        provideHttpClient(withInterceptorsFromDi()),
        provideTransloco({
            config: {
                availableLangs: [Languages.en, Languages.es],
                defaultLang: Languages.en,
                fallbackLang: Languages.en,
                prodMode: envService.isProduction(),
                reRenderOnLangChange: true,
            },
            loader: TranslocoLoaderService,
        }),
        importProvidersFrom(
            AuthModule.forRoot({
                domain: envConfig.domain,
                clientId: envConfig.clientId,
                authorizationParams: {
                    redirect_uri: envConfig.redirectUri,
                    audience: envConfig.audience,
                },
            }),
        ),
    ],
};
