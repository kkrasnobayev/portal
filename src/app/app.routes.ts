import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found/not-found.page';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/home/home.page').then((c) => c.ROUTES),
        pathMatch: 'full',
        data: { title: 'Home' },
    },
    {
        path: 'home',
        redirectTo: '',
        data: { title: 'Home' },
    },
    {
        path: 'about',
        loadChildren: () => import('./pages/about/about.page').then((c) => c.ROUTES),
        data: { title: 'About' },
    },
    {
        path: '**',
        component: NotFoundPageComponent,
        data: { title: 'Not Found' },
    },
];
