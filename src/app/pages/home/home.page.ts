import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { PreloaderComponent } from '../../widgets/preloader/preloader.component';
import { MainContainerComponent } from '../../components/main-container/main-container.component';
import { TranslocoPipe } from '@jsverse/transloco';
import { HOME_PAGE_USER_ROUTE_GUARD } from './home.page.guard';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [PreloaderComponent, MainContainerComponent, TranslocoPipe],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss',
})
export class HomePageComponent {}

export const ROUTES: Routes = [{ path: '', component: HomePageComponent, canActivate: [HOME_PAGE_USER_ROUTE_GUARD] }];
