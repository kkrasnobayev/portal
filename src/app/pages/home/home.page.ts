import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { EnvironmentService } from '../../services/environment/environment.service';
import { Maybe, Nullable } from '../../globals/global.types';
import { PreferredApps } from '../../globals/global.enums';
import { PreloaderComponent } from '../../widgets/preloader/preloader.component';
import { MainContainerComponent } from '../../components/main-container/main-container.component';
import { NAMESPACE } from '../../globals/global.constants';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [PreloaderComponent, MainContainerComponent, TranslocoPipe],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss',
})
export class HomePageComponent implements OnInit {
    noPreferredApp: WritableSignal<boolean> = signal<boolean>(false);

    private authService: AuthService = inject(AuthService);
    private environmentService: EnvironmentService = inject(EnvironmentService);
    private route: ActivatedRoute = inject(ActivatedRoute);
    private user = this.route.snapshot.data['user'];

    ngOnInit(): void {
        if (this.user) {
            this.redirectToApp(this.user[NAMESPACE + 'preferredApp']);
        } else {
            this.authService.loginWithRedirect();
        }
    }

    redirectToApp(preferredApp: Maybe<PreferredApps>): void {
        const url: Nullable<string> = this.environmentService.getPreferredAppUrl(preferredApp);

        if (url) {
            window.location.href = url;
        } else {
            this.noPreferredApp.set(true);
        }
    }
}

export const ROUTES: Routes = [{ path: '', component: HomePageComponent }];
