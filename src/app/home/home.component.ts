import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromRoot from '../app.reducer';
import { Store } from '@ngrx/store';
import APP_SETTINGS from '../settings/app-settings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  appVersion: string = APP_SETTINGS.appVersion;
  showDrawerText: boolean = true;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    // this.getAppVersion$.subscribe((getAppVersionState) => {
    //   this.appVersion = getAppVersionState;
    // });
  }
}
