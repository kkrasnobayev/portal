import { Component, inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { NgOptimizedImage } from '@angular/common';
import { MainContainerComponent } from '../../components/main-container/main-container.component';

@Component({
    selector: 'app-session-expired',
    standalone: true,
    imports: [NgOptimizedImage, MainContainerComponent],
    templateUrl: './session-expired.page.html',
})
export class SessionExpiredPageComponent {
    private auth: AuthService = inject(AuthService);

    login(): boolean {
        this.auth.loginWithRedirect();
        return false;
    }
}

export const ROUTES: Routes = [{ path: '', component: SessionExpiredPageComponent }];
