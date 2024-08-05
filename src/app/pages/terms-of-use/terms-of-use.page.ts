import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { MainContainerComponent } from '../../components/widgets/main-container/main-container.component';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
    selector: 'app-terms-of-use',
    standalone: true,
    imports: [NgOptimizedImage, MainContainerComponent, TranslocoPipe],
    templateUrl: './terms-of-use.page.html',
    styleUrl: './terms-of-use.page.scss',
})
export class TermsOfUsePageComponent {}

export const ROUTES: Routes = [{ path: '', component: TermsOfUsePageComponent }];
