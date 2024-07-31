import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
    selector: 'app-home2',
    standalone: true,
    imports: [],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss',
})
export class HomePageComponent {}

export const ROUTES: Routes = [{ path: '', component: HomePageComponent }];
