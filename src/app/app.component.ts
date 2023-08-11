import { Component, EventEmitter } from '@angular/core';
import { AppSettingsService } from './service/app-settings.service';
import * as fromAppReducer from './app.reducer';
import { Store } from '@ngrx/store';
import { Observable, firstValueFrom } from 'rxjs';
import { SetAppBaseApiUrlAction, SetAppVersionAction } from './state/app-state.action';
import APP_SETTINGS from './settings/app-settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cohesion-webapp';

  initialized = new EventEmitter<boolean>();
  getAppSettings$: Observable<any> = this.appSettingService.getAppSettings();

  constructor(private store: Store<fromAppReducer.State>, private appSettingService: AppSettingsService) {
    console.log('[AppComponent] CONSTRACT');
  }

  async ngOnInit() {
    console.log('[AppComponent] ngOnInit');

    await this.loadAppSettingsAsnyc();

    this.initialized.emit(true);
  }

  async loadAppSettingsAsnyc() {
    let getAppSettings: any = await firstValueFrom(this.getAppSettings$);

    await this.store.dispatch(new SetAppBaseApiUrlAction(getAppSettings.baseApiUrl));
    await this.store.dispatch(new SetAppVersionAction(getAppSettings.appVersion));

    APP_SETTINGS.baseApiUrl = getAppSettings.baseApiUrl;
    APP_SETTINGS.appVersion = getAppSettings.appVersion;

    console.log(`[AppComponent] loadAppSettings ${getAppSettings.baseApiUrl}`);
  }
}
