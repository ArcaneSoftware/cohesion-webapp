import { AppStateActions, SET_BASE_API_URL_ACTION, SET_APP_VERSION_ACTION } from './app-state.action';

export interface State {
  appVersion: string;
  baseApiUrl: string;
}

const initialState: State = {
  appVersion: '',
  baseApiUrl: '',
};

export function AppStateReducer(state = initialState, action: AppStateActions) {
  switch (action.type) {
    case SET_APP_VERSION_ACTION:
      return { ...state, appVersion: action.payload };
    case SET_BASE_API_URL_ACTION:
      return { ...state, baseApiUrl: action.payload };
    default: {
      return state;
    }
  }
}

export const getAppVersion = (state: State) => state.appVersion;
export const getBaseApiUrl = (state: State) => state.baseApiUrl;
