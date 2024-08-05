import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    computed,
    ElementRef,
    HostListener,
    inject,
    input,
    InputSignal,
    Signal,
    viewChild,
} from '@angular/core';
import { PreloaderComponent } from '../preloader/preloader.component';
import { NgOptimizedImage, NgStyle } from '@angular/common';
import {
    Copyright,
    PeakFooterContainerComponent,
    PeakFooterContainerModule,
    PeakFooterModule,
    PeakHeaderContainerComponent,
    PeakHeaderContainerModule,
    PeakHeaderModule,
    PeakShellLayoutModule,
} from '@ascentgl/peak4v2-ui';
import { Link } from '@ascentgl/peak4v2-ui';
import { TranslocoService } from '@jsverse/transloco';
import { Languages } from '../../../globals/global.enums';

@Component({
    selector: 'app-main-container',
    standalone: true,
    imports: [
        PreloaderComponent,
        NgOptimizedImage,
        PeakFooterContainerModule,
        PeakFooterModule,
        PeakHeaderModule,
        PeakHeaderContainerModule,
        PeakShellLayoutModule,
        NgStyle,
    ],
    templateUrl: './main-container.component.html',
    styleUrl: './main-container.component.scss',
})
export class MainContainerComponent implements AfterViewInit {
    private transloco: TranslocoService = inject(TranslocoService);
    header: Signal<ElementRef> = viewChild.required(PeakHeaderContainerComponent, {
        read: ElementRef,
    });
    footer: Signal<ElementRef> = viewChild.required(PeakFooterContainerComponent, {
        read: ElementRef,
    });
    centered: InputSignal<boolean> = input<boolean>(true);
    withBackground: InputSignal<boolean> = input<boolean>(true);
    alt: InputSignal<string> = input<string>('Ascent Logo');
    copyright: InputSignal<Copyright> = input({
        text: `&copy; ${new Date().getFullYear()} ${this.transloco.translate('Copyright')}`,
    });
    showTermsOfUse: InputSignal<boolean> = input<boolean>(true);
    links: InputSignal<Link[]> = input<Link[]>([
        {
            href: 'mailto:PEAKsupport@ascentgl.com',
            text: 'PEAKsupport@ascentgl.com',
        },
        {
            href:
                this.transloco.getActiveLang() === Languages.es
                    ? 'https://2744657.fs1.hubspotusercontent-na1.net/hubfs/2744657/Privacy-Notice-Mexico.pdf'
                    : 'https://ascentlogistics.com/privacy-policy',
            text: this.transloco.translate('PolicyAndLegalDisclaimer'),
            target: '_blank',
        },
    ]);
    logoSrc: InputSignal<string> = input<string>('https://cdn.ascentlogistics.com/img/ascent-logo.png');

    displayedLinks: Signal<Link[]> = computed(() => {
        if (this.showTermsOfUse()) {
            return [...this.links(), this.termsOfServiceLink];
        }

        return this.links();
    });

    private readonly termsOfServiceLink: Link = {
        href: '/terms-of-use',
        text: this.transloco.translate('TermsOfUse'),
    };

    private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

    ngAfterViewInit(): void {
        this.cdr.detectChanges();
    }

    @HostListener('window:resize') resize(): void {
        /**
         * required for proper header/footer size calculation in template
         */
    }
}
