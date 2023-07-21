import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAppStateReducer from './state/app-state.reducer';

export interface State {
  appState: fromAppStateReducer.State;
}

export const reducer: ActionReducerMap<State, any> = {
  appState: fromAppStateReducer.AppStateReducer,
};

export const getAppState = createFeatureSelector<fromAppStateReducer.State>('appState');
export const getAppVersionState = createSelector(getAppState, fromAppStateReducer.getAppVersion);
export const getBaseApiUrlState = createSelector(getAppState, fromAppStateReducer.getBaseApiUrl);
