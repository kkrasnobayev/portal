import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { MainContainerComponent } from '../../components/widgets/main-container/main-container.component';
import { TranslocoPipe } from '@jsverse/transloco';
import { LoginLinkComponent } from '../../components/widgets/login-link/login-link.component';

@Component({
    selector: 'app-session-expired',
    standalone: true,
    imports: [NgOptimizedImage, MainContainerComponent, TranslocoPipe, LoginLinkComponent],
    templateUrl: './session-expired.page.html',
})
export class SessionExpiredPageComponent {}

export const ROUTES: Routes = [{ path: '', component: SessionExpiredPageComponent }];
