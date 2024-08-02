import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found/not-found.page';
import { TRANSLOCO_RESOLVER } from './components/resolvers/transloco.resolver';
import { AUTHENTICATED_USER_ROUTE_GUARD } from './components/guards/authenticated-user.guard';
import { REDIRECT_PAGE_USER_ROUTE_GUARD } from './pages/redirect/redirect.page.guard';

export const routes: Routes = [
    {
        path: '',
        resolve: { transloco: TRANSLOCO_RESOLVER },
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/home/home.page').then((c) => c.ROUTES),
                pathMatch: 'full',
                data: { title: 'Home', preloader: true },
                canActivate: [AUTHENTICATED_USER_ROUTE_GUARD],
            },
            {
                path: 'home',
                redirectTo: '',
                data: { title: 'Home' },
            },
            {
                path: 'redirect',
                loadChildren: () => import('./pages/redirect/redirect.page').then((c) => c.ROUTES),
                data: { title: 'Redirect', preloader: true },
                canActivate: [REDIRECT_PAGE_USER_ROUTE_GUARD],
            },
            {
                path: 'session-expired',
                loadChildren: () => import('./pages/session-expired/session-expired.page').then((c) => c.ROUTES),
                data: { title: 'Session Expired' },
            },
            {
                path: 'terms-of-use',
                loadChildren: () => import('./pages/terms-of-use/terms-of-use.page').then((c) => c.ROUTES),
                data: { title: 'Terms Of Use', translocoScopes: ['terms-of-use'] },
                resolve: {
                    transloco: TRANSLOCO_RESOLVER,
                },
            },
            {
                path: '**',
                component: NotFoundPageComponent,
                data: { title: 'Not Found' },
            },
        ],
    },
];
