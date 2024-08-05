import { Injectable } from '@angular/core';
import { PreloadingStrategy } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AppRoute } from '../../globals/global.types';

@Injectable({ providedIn: 'root' })
export class FlagBasedPreloadingStrategy extends PreloadingStrategy {
    /**
     * if route data has "preload" parameter - eagerly load the route after
     * other required routes are loaded
     */
    preload(route: AppRoute, load: () => Observable<unknown>): Observable<unknown> {
        return route.data?.preload ? load() : of();
    }
}
