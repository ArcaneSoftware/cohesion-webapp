import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AppSettingsService {
    appVersion: string = '';
    baseApiUrl: string = '';

    constructor(private http: HttpClient) {}

    load(url: string): Promise<any> {
        return firstValueFrom(this.http.get(url)).then((appSettings: any) => {
            this.appVersion = appSettings.appVersion;
            this.baseApiUrl = appSettings.baseApiUrl;
        });
    }
}
