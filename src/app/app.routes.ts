import { NotFoundPageComponent } from './pages/not-found/not-found.page';
import { TRANSLOCO_RESOLVER } from './components/resolvers/transloco.resolver';
import { AUTHENTICATED_USER_ROUTE_GUARD } from './components/guards/authenticated-user.guard';
import { GUEST_USER_ROUTE_GUARD } from './components/guards/guest-user.guard';
import { AppRoute } from './globals/global.types';

export const routes: AppRoute[] = [
    {
        path: '',
        resolve: { transloco: TRANSLOCO_RESOLVER },
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/home/home.page').then((c) => c.ROUTES),
                pathMatch: 'full',
                title: 'Home',
                data: { showPreloader: true },
                canActivate: [AUTHENTICATED_USER_ROUTE_GUARD],
            },
            {
                path: 'home',
                redirectTo: '',
                title: 'Home',
            },
            {
                path: 'redirect',
                loadChildren: () => import('./pages/redirect/redirect.page').then((c) => c.ROUTES),
                title: 'Redirect',
                data: { showPreloader: true },
            },
            {
                path: 'session-expired',
                loadChildren: () => import('./pages/session-expired/session-expired.page').then((c) => c.ROUTES),
                title: 'Session Expired',
                canActivate: [GUEST_USER_ROUTE_GUARD],
            },
            {
                path: 'terms-of-use',
                title: 'Terms Of Use',
                loadChildren: () => import('./pages/terms-of-use/terms-of-use.page').then((c) => c.ROUTES),
                data: { translocoScopes: ['terms-of-use'] },
                resolve: {
                    transloco: TRANSLOCO_RESOLVER,
                },
            },
            {
                path: '**',
                component: NotFoundPageComponent,
                title: 'Not Found',
            },
        ],
    },
];
