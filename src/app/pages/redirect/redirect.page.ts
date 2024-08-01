import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Params, Routes } from '@angular/router';
import { PreloaderComponent } from '../../widgets/preloader/preloader.component';
import { AuthService } from '@auth0/auth0-angular';
import { MainContainerComponent } from '../../components/main-container/main-container.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-redirect',
    standalone: true,
    imports: [PreloaderComponent, NgOptimizedImage, MainContainerComponent],
    templateUrl: './redirect.page.html',
})
export class RedirectPageComponent implements OnInit {
    isLoading: WritableSignal<boolean> = signal<boolean>(true);
    message: WritableSignal<string> = signal<string>('Sorry, this link has expired');

    private auth: AuthService = inject(AuthService);
    private route: ActivatedRoute = inject(ActivatedRoute);

    ngOnInit(): void {
        this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
            if (isAuthenticated) {
                this.auth.logout();
            } else {
                this.route.queryParams.subscribe((params: Params) => {
                    if (params['success'] === 'true') {
                        this.auth.loginWithRedirect();
                    } else {
                        const message = (params['message'] ?? '').trim();

                        if (message) {
                            this.message.set(message);
                        }

                        this.isLoading.set(false);
                    }
                });
            }
        });
    }

    login(): boolean {
        this.auth.loginWithRedirect();
        return false;
    }
}

export const ROUTES: Routes = [{ path: '', component: RedirectPageComponent }];
