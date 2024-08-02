import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Params, Routes } from '@angular/router';
import { PreloaderComponent } from '../../widgets/preloader/preloader.component';
import { AuthService } from '@auth0/auth0-angular';
import { MainContainerComponent } from '../../components/main-container/main-container.component';
import { NgOptimizedImage } from '@angular/common';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { LoginLinkComponent } from '../../components/login-link/login-link.component';

@Component({
    selector: 'app-redirect',
    standalone: true,
    imports: [PreloaderComponent, NgOptimizedImage, MainContainerComponent, TranslocoPipe, LoginLinkComponent],
    templateUrl: './redirect.page.html',
})
export class RedirectPageComponent implements OnInit {
    private transloco = inject(TranslocoService);
    isLoading: WritableSignal<boolean> = signal<boolean>(true);
    message: WritableSignal<string> = signal<string>(this.transloco.translate('LinkIsExpired'));

    private authService: AuthService = inject(AuthService);
    private route: ActivatedRoute = inject(ActivatedRoute);
    private user = this.route.snapshot.data['user'];

    ngOnInit(): void {
        if (this.user) {
            this.authService.logout();
        } else {
            this.route.queryParams.subscribe((params: Params) => {
                if (params['success'] === 'true') {
                    this.authService.loginWithRedirect();
                } else {
                    const message = (params['message'] ?? '').trim();

                    if (message) {
                        this.message.set(message);
                    }

                    this.isLoading.set(false);
                }
            });
        }
    }
}

export const ROUTES: Routes = [{ path: '', component: RedirectPageComponent }];
