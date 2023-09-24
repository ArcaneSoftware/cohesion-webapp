import { SET_OPERATION_IS_SUBJECT_CHANGED_ACTION, OperationStateActions, SET_OPERATION_IS_SUBJECT_SELECTED_ACTION } from './operation-state.action';

export interface State {
    isSubjectChanged: boolean;
    isSubjectSelected: boolean;
}

const initialState: State = {
    isSubjectChanged: false,
    isSubjectSelected: false,
};

export function OperationStateReducer(state = initialState, action: OperationStateActions) {
    switch (action.type) {
        case SET_OPERATION_IS_SUBJECT_CHANGED_ACTION:
            return { ...state, isSubjectChanged: action.payload };
        case SET_OPERATION_IS_SUBJECT_SELECTED_ACTION:
            return { ...state, isSubjectSelected: action.payload };
        default: {
            return state;
        }
    }
}

export const getIsSubjectChanged = (state: State) => state.isSubjectChanged;
export const getIsSubjectSelected = (state: State) => state.isSubjectSelected;
