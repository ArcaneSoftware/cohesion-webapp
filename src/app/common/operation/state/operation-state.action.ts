import { Action } from '@ngrx/store';

export const SET_OPERATION_IS_SUBJECT_CHANGED_ACTION = '[OPERATION] Set Is Subject Changed';
export const SET_OPERATION_IS_SUBJECT_SELECTED_ACTION = '[OPERATION] Set Is Subject Selected';

export class SetIsSubjectChangedAction implements Action {
    readonly type = SET_OPERATION_IS_SUBJECT_CHANGED_ACTION;

    constructor(public payload: boolean) {}
}

export class SetIsSubjectSelectedAction implements Action {
    readonly type = SET_OPERATION_IS_SUBJECT_SELECTED_ACTION;

    constructor(public payload: boolean) {}
}

export type OperationStateActions = SetIsSubjectChangedAction | SetIsSubjectSelectedAction;
