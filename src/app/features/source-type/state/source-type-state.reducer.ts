import { SourceTypeElement } from '../../../models/source-type/source-type-element';
import { SourceTypeStateActions, SET_SOURCE_TYPE_SELECTED_ACTION, SET_SOURCE_TYPE_FILTER_REQUEST_ACTION } from './source-type-state.action';
import { FilterSourceTypeRequest } from 'src/app/service/requests/filter-source-type-request';

export interface State {
    selected: SourceTypeElement;
    filterRequest: FilterSourceTypeRequest;
}

const initialState: State = {
    selected: new SourceTypeElement(),
    filterRequest: new FilterSourceTypeRequest(),
};

export function SourceTypeStateReducer(state = initialState, action: SourceTypeStateActions) {
    switch (action.type) {
        case SET_SOURCE_TYPE_SELECTED_ACTION:
            return { ...state, selected: action.payload };
        case SET_SOURCE_TYPE_FILTER_REQUEST_ACTION:
            return { ...state, filterRequest: action.payload };
        default: {
            return state;
        }
    }
}

export const getSourceTypeSelected = (state: State) => state.selected;
export const getSourceTypeFilterRequest = (state: State) => state.filterRequest;
