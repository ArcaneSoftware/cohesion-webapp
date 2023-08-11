import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAppStateReducer from './state/app-state.reducer';
import * as fromOperationStateReducer from './common/operation/state/operation-state.reducer';
import * as fromSourceTypeStateReducer from './features/source-type/state/source-type-state.reducer';

export interface State {
    appState: fromAppStateReducer.State;
    operationState: fromOperationStateReducer.State;
    sourceTypeState: fromSourceTypeStateReducer.State;
}

export const reducer: ActionReducerMap<State, any> = {
    appState: fromAppStateReducer.AppStateReducer,
    operationState: fromOperationStateReducer.OperationStateReducer,
    sourceTypeState: fromSourceTypeStateReducer.SourceTypeStateReducer,
};

export const getAppState = createFeatureSelector<fromAppStateReducer.State>('appState');
export const getAppVersionState = createSelector(getAppState, fromAppStateReducer.getAppVersion);
export const getAppBaseApiUrlState = createSelector(getAppState, fromAppStateReducer.getAppBaseApiUrl);

export const getOperationState = createFeatureSelector<fromOperationStateReducer.State>('operationState');
export const getOperationModeState = createSelector(getOperationState, fromOperationStateReducer.getOperationMode);
export const getOperationIsContentChangedState = createSelector(getOperationState, fromOperationStateReducer.getIsContentChanged);

export const getSourceTypeState = createFeatureSelector<fromSourceTypeStateReducer.State>('sourceTypeState');
export const getSourceTypeSelectedState = createSelector(getSourceTypeState, fromSourceTypeStateReducer.getSourceTypeSelected);
export const getSourceTypeFilterRequestState = createSelector(getSourceTypeState, fromSourceTypeStateReducer.getSourceTypeFilterRequest);
