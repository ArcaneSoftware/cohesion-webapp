import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SourceTypeElement } from '../../models/source-type-element';
import { SourceStateActions, SELECTED_SOURCE_TYPE_ACTION } from './source-type-state.action';

export interface State {
  selectedSourceType: SourceTypeElement;
}

const initialState: State = {
  selectedSourceType: new SourceTypeElement(),
};

export function SourceStateReducer(state = initialState, action: SourceStateActions) {
  switch (action.type) {
    case SELECTED_SOURCE_TYPE_ACTION:
      return { ...state, selectedSourceType: action.payload };
    default: {
      return state;
    }
  }
}

export const getsSelectedSourceType = (state: State) => state.selectedSourceType;

export const getSourceState = createFeatureSelector<State>('sourceState');
export const getsSelectedSourceTypeSelector = createSelector(getSourceState, getsSelectedSourceType);
