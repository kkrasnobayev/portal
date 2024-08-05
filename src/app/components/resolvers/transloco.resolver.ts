import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { combineLatest, map } from 'rxjs';
import { inject } from '@angular/core';
import { Translation, TranslocoService } from '@jsverse/transloco';
import { Maybe } from '../../globals/global.types';

export const TRANSLOCO_RESOLVER: ResolveFn<true> = (route: ActivatedRouteSnapshot): Observable<true> => {
    const translocoService: TranslocoService = inject(TranslocoService);

    /**
     * get current browse language
     */
    const browserLang: string = navigator.language;

    /**
     * if this browser lang is allowed by transloco - use it
     */
    if ((translocoService.getAvailableLangs() as string[]).includes(browserLang)) {
        translocoService.setActiveLang(browserLang);
    }

    /**
     * get current transloco language
     */
    const lang: string = translocoService.getActiveLang();

    /**
     * prepare an array that will hold all translation observables
     */
    const observables: Observable<Translation>[] = [translocoService.selectTranslation(lang)];

    /**
     * get translation scopes that we need to load from the route data
     */
    const translocoScopes: Maybe<string[]> = route.data['translocoScopes'];

    /**
     * if we have transoloco scopes provided - loop through them
     * and add translation observables into an array
     */
    if (translocoScopes) {
        translocoScopes.forEach((scope: string) => {
            observables.push(translocoService.selectTranslation(`${scope}/${lang}`));
        });
    }

    /**
     * load all the required translations and return observable of "true" in the end
     */
    return combineLatest(observables).pipe(map((): true => true));
};
