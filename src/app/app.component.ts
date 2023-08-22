import { Component, EventEmitter, OnInit } from '@angular/core';
import * as fromAppReducer from './app.reducer';
import { Store } from '@ngrx/store';
import { AppSettingsService } from './services/app-settings/app-settings.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'cohesion-webapp';

    initialized = new EventEmitter<boolean>();

    constructor(
        private appSettingsService: AppSettingsService,
        private store: Store<fromAppReducer.State>,
    ) {
        console.log('[AppComponent] CONSTRACT');
    }

    ngOnInit() {
        console.log('[AppComponent] ngOnInit');

        this.initialized.emit(true);
    }
}
