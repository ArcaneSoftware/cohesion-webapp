import { Action } from '@ngrx/store';
import { OperationMode } from '../models/operation-mode';

export const SET_OPERATION_MODE_ACTION = '[OPERATION] Set Mode';
export const SET_OPERATION_IS_SUBJECT_CHANGED_ACTION = '[OPERATION] Set Is Subject Changed';
export const SET_OPERATION_IS_SUBJECT_SELECTED_ACTION = '[OPERATION] Set Is Subject Selected';

export class SetOperationModeAction implements Action {
    readonly type = SET_OPERATION_MODE_ACTION;

    constructor(public payload: OperationMode) {}
}

export class SetIsSubjectChangedAction implements Action {
    readonly type = SET_OPERATION_IS_SUBJECT_CHANGED_ACTION;

    constructor(public payload: boolean) {}
}

export class SetIsSubjectSelectedAction implements Action {
    readonly type = SET_OPERATION_IS_SUBJECT_SELECTED_ACTION;

    constructor(public payload: boolean) {}
}

export type OperationStateActions = SetOperationModeAction | SetIsSubjectChangedAction | SetIsSubjectSelectedAction;
