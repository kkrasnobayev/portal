import { Component } from '@angular/core';
import { MainContainerComponent } from '../../components/main-container/main-container.component';

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [MainContainerComponent],
    templateUrl: './not-found.page.html',
    styleUrl: './not-found.page.scss',
})
export class NotFoundPageComponent {}
