import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class CustomTitleStrategy extends TitleStrategy {
    private titleService: Title = inject(Title);

    override updateTitle(snapshot: RouterStateSnapshot) {
        this.setPageTitle(this.buildTitle(snapshot));
    }

    override buildTitle(snapshot: RouterStateSnapshot): string {
        return snapshot.root.firstChild?.data['title'] ?? '';
    }

    setPageTitle(pageTitle?: string) {
        this.titleService.setTitle(pageTitle ?? '');
    }
}
