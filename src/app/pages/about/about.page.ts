import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [],
    templateUrl: './about.page.html',
    styleUrl: './about.page.scss',
})
export class AboutPageComponent {}

export const ROUTES: Routes = [{ path: '', component: AboutPageComponent }];
