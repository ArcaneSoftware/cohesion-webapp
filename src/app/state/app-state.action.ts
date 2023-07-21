import { Action } from '@ngrx/store';

export const SET_BASE_API_URL_ACTION = '[BASE-API-URL] Set Base Api Url';
export const SET_APP_VERSION_ACTION = '[APP-VERSION] Set App Version';

export class SetApiUrlAction implements Action {
  readonly type = SET_BASE_API_URL_ACTION;

  constructor(public payload: string) {}
}

export class SetAppVersionAction implements Action {
  readonly type = SET_APP_VERSION_ACTION;

  constructor(public payload: string) {}
}

export type AppStateActions = SetApiUrlAction | SetAppVersionAction;
