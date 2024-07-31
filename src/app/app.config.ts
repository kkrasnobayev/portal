import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, TitleStrategy, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { CustomTitleStrategy } from './components/strategies/custom-title.strategy';
import { FlagBasedPreloadingStrategy } from './components/strategies/flag-based-preloading.strategy';

export const appConfig: ApplicationConfig = {
    providers: [
        provideExperimentalZonelessChangeDetection(),
        { provide: TitleStrategy, useClass: CustomTitleStrategy },
        provideRouter(routes, withPreloading(FlagBasedPreloadingStrategy)),
    ],
};
