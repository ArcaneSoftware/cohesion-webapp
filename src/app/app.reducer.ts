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

export const getAppFeatureState = createFeatureSelector<fromAppStateReducer.State>('appState');
export const getAppVersionState = createSelector(getAppFeatureState, fromAppStateReducer.getAppVersion);
export const getAppBaseApiUrlState = createSelector(getAppFeatureState, fromAppStateReducer.getAppBaseApiUrl);

export const getOperationState = createFeatureSelector<fromOperationStateReducer.State>('operationState');
export const getOperationModeState = createSelector(getOperationState, fromOperationStateReducer.getOperationMode);
export const getOperationIsSubjectChangedState = createSelector(getOperationState, fromOperationStateReducer.getIsSubjectChanged);
export const getOperationIsSubjectSelectedState = createSelector(getOperationState, fromOperationStateReducer.getIsSubjectSelected);
export const getOperationEventState = createSelector(getOperationState, fromOperationStateReducer.getOperationEvent);

export const getSourceTypeFeatureState = createFeatureSelector<fromSourceTypeStateReducer.State>('sourceTypeState');
export const getSourceTypeSelectedState = createSelector(getSourceTypeFeatureState, fromSourceTypeStateReducer.getSourceTypeSelected);
