import { OperationMode } from '../model/operation-mode';
import { SET_OPERATION_IS_CONTENT_CHANGED_ACTION, OperationStateActions, SET_OPERATION_MODE_ACTION } from './operation-state.action';

export interface State {
    mode: OperationMode;
    isContentChanged: boolean;
}

const initialState: State = {
    mode: OperationMode.Filter,
    isContentChanged: false,
};

export function OperationStateReducer(state = initialState, action: OperationStateActions) {
    switch (action.type) {
        case SET_OPERATION_MODE_ACTION:
            return { ...state, mode: action.payload };
        case SET_OPERATION_IS_CONTENT_CHANGED_ACTION:
            return { ...state, isContentChanged: action.payload };
        default: {
            return state;
        }
    }
}

export const getOperationMode = (state: State) => state.mode;
export const getIsContentChanged = (state: State) => state.isContentChanged;
