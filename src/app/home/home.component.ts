import { Component, OnInit } from '@angular/core';
import { AppSettingsService } from '../services/app-settings/app-settings.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    appVersion: string = this.appSettingsService.appVersion;

    constructor(private appSettingsService: AppSettingsService) {}

    ngOnInit() {}
}
