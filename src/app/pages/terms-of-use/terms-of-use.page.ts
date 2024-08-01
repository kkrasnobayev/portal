import { Component, inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { NgOptimizedImage } from '@angular/common';
import { MainContainerComponent } from '../../components/main-container/main-container.component';

@Component({
    selector: 'app-terms-of-use',
    standalone: true,
    imports: [NgOptimizedImage, MainContainerComponent],
    templateUrl: './terms-of-use.page.html',
    styleUrl: './terms-of-use.page.scss',
})
export class TermsOfUsePageComponent {
    private auth: AuthService = inject(AuthService);

    login(): boolean {
        this.auth.loginWithRedirect();
        return false;
    }
}

export const ROUTES: Routes = [{ path: '', component: TermsOfUsePageComponent }];
