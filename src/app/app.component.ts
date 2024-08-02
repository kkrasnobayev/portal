import { Component, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { PreloaderComponent } from './widgets/preloader/preloader.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, PreloaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    isLoading: WritableSignal<boolean> = signal<boolean>(true);

    constructor(private router: Router) {
        this.router.events.subscribe((event): void => {
            if (event instanceof NavigationStart) {
                this.isLoading.set(true);
            } else if (event instanceof NavigationEnd) {
                this.isLoading.set(false);
            }
        });
    }
}
