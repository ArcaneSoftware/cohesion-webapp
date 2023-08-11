import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SourceTypeElement } from '../../../models/source-type/source-type-element';
import { SourceTypeStateActions, SET_SOURCE_TYPE_SELECTED_ACTION } from './source-type-state.action';

export interface State {
  selected: SourceTypeElement;
}

const initialState: State = {
  selected: new SourceTypeElement(),
};

export function SourceStateReducer(state = initialState, action: SourceTypeStateActions) {
  switch (action.type) {
    case SET_SOURCE_TYPE_SELECTED_ACTION:
      return { ...state, selected: action.payload };
    default: {
      return state;
    }
  }
}

export const getSourceTypeSelected = (state: State) => state.selected;
