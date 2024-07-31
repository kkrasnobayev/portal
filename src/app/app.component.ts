import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EnvironmentService } from './services/environment/environment.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    constructor(private environmentService: EnvironmentService) {
        console.log(environmentService.currentEnvironment());
    }
}
