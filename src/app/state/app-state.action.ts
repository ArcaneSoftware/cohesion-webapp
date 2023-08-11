import { Action } from '@ngrx/store';

export const SET_APP_BASE_API_URL_ACTION = '[APP] Set Base Api Url';
export const SET_APP_VERSION_ACTION = '[APP] Set Version';

export class SetAppBaseApiUrlAction implements Action {
  readonly type = SET_APP_BASE_API_URL_ACTION;

  constructor(public payload: string) {}
}

export class SetAppVersionAction implements Action {
  readonly type = SET_APP_VERSION_ACTION;

  constructor(public payload: string) {}
}

export type AppStateActions = SetAppBaseApiUrlAction | SetAppVersionAction;
