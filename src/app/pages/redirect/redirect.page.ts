import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Params, Routes } from '@angular/router';
import { PreloaderComponent } from '../../widgets/preloader/preloader.component';
import { MainContainerComponent } from '../../components/main-container/main-container.component';
import { NgOptimizedImage } from '@angular/common';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { LoginLinkComponent } from '../../components/login-link/login-link.component';
import { REDIRECT_PAGE_USER_ROUTE_GUARD } from './redirect.page.guard';

@Component({
    selector: 'app-redirect',
    standalone: true,
    imports: [PreloaderComponent, NgOptimizedImage, MainContainerComponent, TranslocoPipe, LoginLinkComponent],
    templateUrl: './redirect.page.html',
})
export class RedirectPageComponent implements OnInit {
    private transloco = inject(TranslocoService);
    message: WritableSignal<string> = signal<string>(this.transloco.translate('LinkIsExpired'));

    private route: ActivatedRoute = inject(ActivatedRoute);

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: Params) => {
            const message = (params['message'] ?? '').trim();

            if (message) {
                this.message.set(message);
            }
        });
    }
}

export const ROUTES: Routes = [
    { path: '', component: RedirectPageComponent, canActivate: [REDIRECT_PAGE_USER_ROUTE_GUARD] },
];
