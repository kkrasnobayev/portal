import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, RouteConfigLoadStart, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PreloaderService {
    isLoading: WritableSignal<boolean> = signal<boolean>(false);

    private router: Router = inject(Router);

    activate(): void {
        this.router.events.subscribe((event): void => {
            /**
             * if route config loading starts - check if route data has "preloader" parameter;
             * if yes - show preloader
             * if route navigation ends - make sure to hide preloader
             */
            if (event instanceof RouteConfigLoadStart) {
                this.isLoading.set(!!event.route.data?.['preloader']);
            } else if (event instanceof NavigationEnd) {
                this.isLoading.set(false);
            }
        });
    }
}
