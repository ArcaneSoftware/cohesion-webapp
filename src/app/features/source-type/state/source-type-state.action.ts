import { Action } from '@ngrx/store';
import { SourceTypeElement } from '../../models/source-type-element';

export const SELECTED_SOURCE_TYPE_ACTION = '[SOURCE] selected the source type';

export class SelectedSourceType implements Action {
  readonly type = SELECTED_SOURCE_TYPE_ACTION;

  constructor(public payload: SourceTypeElement) {}
}

export type SourceStateActions = SelectedSourceType;
