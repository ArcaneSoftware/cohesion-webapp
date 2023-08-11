import { Action } from '@ngrx/store';
import { OperationMode } from '../model/operation-mode';

export const SET_OPERATION_MODE_ACTION = '[OPERATION] Set Mode';
export const SET_OPERATION_CAN_SAVE_ACTION = '[OPERATION] Set Can Save ';
export const SET_OPERATION_IS_CONTENT_CHANGED_ACTION = '[OPERATION] Set Is Content Changed';

export class SetOperationModeAction implements Action {
  readonly type = SET_OPERATION_MODE_ACTION;

  constructor(public payload: OperationMode) {}
}

export class SetCanSaveOperationAction implements Action {
  readonly type = SET_OPERATION_CAN_SAVE_ACTION;

  constructor(public payload: boolean) {}
}

export class SetIsContentChangedAction implements Action {
  readonly type = SET_OPERATION_IS_CONTENT_CHANGED_ACTION;

  constructor(public payload: boolean) {}
}

export type OperationStateActions = SetOperationModeAction | SetCanSaveOperationAction | SetIsContentChangedAction;
