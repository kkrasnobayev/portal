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
import { PreloaderComponent } from '../../widgets/preloader/preloader.component';
import { JsonPipe, NgOptimizedImage, NgStyle } from '@angular/common';
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
        JsonPipe,
    ],
    templateUrl: './main-container.component.html',
    styleUrl: './main-container.component.scss',
})
export class MainContainerComponent implements AfterViewInit {
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
        text: `&copy; ${new Date().getFullYear()} Peak&trade; is an Ascent Global Logistics Technology`,
    });
    showTermsOfUse: InputSignal<boolean> = input<boolean>(true);
    links: InputSignal<Link[]> = input<Link[]>([
        {
            href: 'mailto:PEAKsupport@ascentgl.com',
            text: 'PEAKsupport@ascentgl.com',
        },
        {
            href: 'https://ascentlogistics.com',
            text: ' Legal Disclaimer',
            target: '_blank',
        },
    ]);

    displayedLinks: Signal<Link[]> = computed(() => {
        if (this.showTermsOfUse()) {
            return [...this.links(), this.termsOfServiceLink];
        }

        return this.links();
    });

    logoSrc: InputSignal<string> = input<string>('https://cdn.ascentlogistics.com/img/ascent-logo.png');

    private readonly termsOfServiceLink: Link = {
        href: '/terms-of-use',
        text: 'Terms of Use',
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
