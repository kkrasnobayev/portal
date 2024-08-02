import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslocoLoaderService implements TranslocoLoader {
    constructor(private http: HttpClient) {}

    getTranslation(lang: string): Observable<Translation> {
        return this.http.get<Translation>(`/public/i18n/${lang}.json`);
    }
}
