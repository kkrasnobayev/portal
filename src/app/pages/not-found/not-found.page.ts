import { Component } from '@angular/core';
import { MainContainerComponent } from '../../components/main-container/main-container.component';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [MainContainerComponent, TranslocoPipe],
    templateUrl: './not-found.page.html',
    styleUrl: './not-found.page.scss',
})
export class NotFoundPageComponent {}
