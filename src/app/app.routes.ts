import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found/not-found.page';
import { USER_RESOLVER_FN } from './components/resolvers/user.resolver';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/home/home.page').then((c) => c.ROUTES),
        pathMatch: 'full',
        data: { title: 'Home' },
        resolve: {
            user: USER_RESOLVER_FN,
        },
    },
    {
        path: 'home',
        redirectTo: '',
        data: { title: 'Home' },
    },
    {
        path: 'redirect',
        loadChildren: () => import('./pages/redirect/redirect.page').then((c) => c.ROUTES),
        data: { title: 'Redirect' },
        resolve: {
            user: USER_RESOLVER_FN,
        },
    },
    {
        path: 'session-expired',
        loadChildren: () => import('./pages/session-expired/session-expired.page').then((c) => c.ROUTES),
        data: { title: 'Session Expired' },
    },
    {
        path: 'terms-of-use',
        loadChildren: () => import('./pages/terms-of-use/terms-of-use.page').then((c) => c.ROUTES),
        data: { title: 'Terms Of Use' },
    },
    {
        path: '**',
        component: NotFoundPageComponent,
        data: { title: 'Not Found' },
    },
];
