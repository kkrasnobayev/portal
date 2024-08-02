import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { combineLatest, map } from 'rxjs';
import { inject } from '@angular/core';
import { Translation, TranslocoService } from '@jsverse/transloco';
import { Maybe } from '../../globals/global.types';

export const TRANSLOCO_RESOLVER: ResolveFn<true> = (route: ActivatedRouteSnapshot): Observable<true> => {
    const translocoService: TranslocoService = inject(TranslocoService);

    const translocoScopes: Maybe<string[]> = route.data['translocoScopes'];

    const browserLang: string = navigator.language;

    if ((translocoService.getAvailableLangs() as string[]).includes(browserLang)) {
        translocoService.setActiveLang(browserLang);
    }

    const lang: string = translocoService.getActiveLang();

    const observables: Observable<Translation>[] = [];

    if (translocoScopes) {
        translocoScopes.forEach((scope: string) => {
            observables.push(translocoService.selectTranslation(`${scope}/${lang}`));
        });
    } else {
        observables.push(translocoService.selectTranslation(lang));
    }

    return combineLatest(observables).pipe(map((): true => true));
};
