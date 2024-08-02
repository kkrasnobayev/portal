import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
    selector: 'app-login-link',
    standalone: true,
    imports: [TranslocoPipe],
    templateUrl: './login-link.component.html',
})
export class LoginLinkComponent {
    private authService: AuthService = inject(AuthService);

    login(): boolean {
        this.authService.loginWithRedirect();
        return false;
    }
}
