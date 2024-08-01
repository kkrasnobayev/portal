import { Component, inject, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { EnvironmentService } from '../../services/environment/environment.service';
import { NAMESPACE } from '../../globals/global.constants';
import { Maybe, Nullable } from '../../globals/global.types';
import { PreferredApps } from '../../globals/global.enums';
import { PreloaderComponent } from '../../widgets/preloader/preloader.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [PreloaderComponent],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss',
})
export class HomePageComponent implements OnInit {
    private auth: AuthService = inject(AuthService);
    private environmentService: EnvironmentService = inject(EnvironmentService);

    ngOnInit(): void {
        this.auth.user$.subscribe((user) => {
            if (user) {
                this.redirectToApp(user[NAMESPACE + 'preferredApp']);
            } else {
                this.auth.loginWithRedirect();
            }
        });
    }

    redirectToApp(preferredApp: Maybe<PreferredApps>): void {
        const url: Nullable<string> = this.environmentService.getPreferredAppUrl(preferredApp);

        if (url) {
            window.location.href = url;
        } else {
            console.log("You don't have a preferred App");
        }
    }
}

export const ROUTES: Routes = [{ path: '', component: HomePageComponent }];
