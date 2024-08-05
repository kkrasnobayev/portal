import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class CustomTitleStrategy extends TitleStrategy {
    private titleService: Title = inject(Title);
    private prefix = 'Ascent Portal';

    override updateTitle(snapshot: RouterStateSnapshot) {
        this.setPageTitle(this.buildTitle(snapshot));
    }

    override buildTitle(snapshot: RouterStateSnapshot): string {
        /**
         * get topmost snapshot and its title
         */
        let activatedSnapshot: ActivatedRouteSnapshot = snapshot.root;
        let title: string = activatedSnapshot.title ?? '';

        /**
         * drill down the activated snapshot children to get the deepest level;
         * if activated snapshot has a title - preserve it
         */
        while (activatedSnapshot.firstChild) {
            activatedSnapshot = activatedSnapshot.firstChild;
            if (activatedSnapshot.title) title = activatedSnapshot.title;
        }

        return title;
    }

    setPageTitle(pageTitle?: string): void {
        this.titleService.setTitle(this.prefix + (pageTitle ? ' :: ' : '') + pageTitle || '');
    }
}
