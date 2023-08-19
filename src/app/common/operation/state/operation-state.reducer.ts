import { OperationEvent } from '../../operation-event';
import { OperationMode } from '../operation-mode';
import {
    SET_OPERATION_IS_SUBJECT_CHANGED_ACTION,
    OperationStateActions,
    SET_OPERATION_MODE_ACTION,
    SET_OPERATION_IS_SUBJECT_SELECTED_ACTION,
    SET_OPERATION_EVENT,
} from './operation-state.action';

export interface State {
    operationMode: OperationMode;
    isSubjectChanged: boolean;
    isSubjectSelected: boolean;
    operationEvent: OperationEvent | null;
}

const initialState: State = {
    operationMode: OperationMode.Filter,
    isSubjectChanged: false,
    isSubjectSelected: false,
    operationEvent: null,
};

export function OperationStateReducer(state = initialState, action: OperationStateActions) {
    switch (action.type) {
        case SET_OPERATION_MODE_ACTION:
            return { ...state, operationMode: action.payload };
        case SET_OPERATION_IS_SUBJECT_CHANGED_ACTION:
            return { ...state, isSubjectChanged: action.payload };
        case SET_OPERATION_IS_SUBJECT_SELECTED_ACTION:
            return { ...state, isSubjectSelected: action.payload };
        case SET_OPERATION_EVENT:
            return { ...state, operationEvent: action.payload };
        default: {
            return state;
        }
    }
}

export const getOperationMode = (state: State) => state.operationMode;
export const getIsSubjectChanged = (state: State) => state.isSubjectChanged;
export const getIsSubjectSelected = (state: State) => state.isSubjectSelected;
export const getOperationEvent = (state: State) => state.operationEvent;
