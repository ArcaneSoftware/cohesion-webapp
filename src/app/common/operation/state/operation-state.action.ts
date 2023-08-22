import { Action } from '@ngrx/store';
import { OperationEvent } from '../models/operation-event';
import { OperationMode } from '../models/operation-mode';

export const SET_OPERATION_MODE_ACTION = '[OPERATION] Set Mode';
export const SET_OPERATION_IS_SUBJECT_CHANGED_ACTION = '[OPERATION] Set Is Subject Changed';
export const SET_OPERATION_IS_SUBJECT_SELECTED_ACTION = '[OPERATION] Set Is Subject Selected';

export const SET_OPERATION_EVENT = '[OPERATION] Set Event';

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

export class SetEventAction implements Action {
    readonly type = SET_OPERATION_EVENT;

    constructor(public payload: OperationEvent) {}
}

export type OperationStateActions = SetOperationModeAction | SetIsSubjectChangedAction | SetIsSubjectSelectedAction | SetEventAction;
