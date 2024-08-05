import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-preloader',
    standalone: true,
    templateUrl: './preloader.component.html',
    styleUrls: ['./preloader.component.scss'],
    imports: [NgOptimizedImage],
})
export class PreloaderComponent {}
