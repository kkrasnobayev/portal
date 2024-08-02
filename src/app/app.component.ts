import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PreloaderComponent } from './widgets/preloader/preloader.component';
import { PreloaderService } from './services/preloader.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, PreloaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    preloaderService: PreloaderService = inject(PreloaderService);

    constructor() {
        this.preloaderService.activate();
    }
}
