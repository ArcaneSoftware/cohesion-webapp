import { AppStateActions, SET_APP_BASE_API_URL_ACTION, SET_APP_VERSION_ACTION } from './app-state.action';

export interface State {
    version: string;
    baseApiUrl: string;
}

const initialState: State = {
    version: '',
    baseApiUrl: '',
};

export function AppStateReducer(state = initialState, action: AppStateActions) {
    switch (action.type) {
        case SET_APP_VERSION_ACTION:
            return { ...state, appVersion: action.payload };
        case SET_APP_BASE_API_URL_ACTION:
            return { ...state, baseApiUrl: action.payload };
        default: {
            return state;
        }
    }
}

export const getAppVersion = (state: State) => state.version;
export const getAppBaseApiUrl = (state: State) => state.baseApiUrl;
