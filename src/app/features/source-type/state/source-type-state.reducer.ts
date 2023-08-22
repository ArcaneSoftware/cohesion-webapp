import { INITIAL_SOURCE_TYPE_ELEMENT } from 'src/app/constant/constant';
import { SourceTypeStateActions, SET_SOURCE_TYPE_SELECTED_ACTION } from './source-type-state.action';
import { SourceTypeElement } from '../models/source-type-element';

export interface State {
    selectedElement: SourceTypeElement;
}

const initialState: State = {
    selectedElement: INITIAL_SOURCE_TYPE_ELEMENT,
};

export function SourceTypeStateReducer(state = initialState, action: SourceTypeStateActions) {
    switch (action.type) {
        case SET_SOURCE_TYPE_SELECTED_ACTION:
            return { ...state, selectedElement: action.payload };
        default: {
            return state;
        }
    }
}

export const getSourceTypeSelected = (state: State) => state.selectedElement;
