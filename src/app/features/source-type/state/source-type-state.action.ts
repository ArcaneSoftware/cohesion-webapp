import { Action } from '@ngrx/store';
import { SourceTypeElement } from '../../../models/source-type/source-type-element';

export const SET_SOURCE_TYPE_SELECTED_ACTION = '[SOURCE-TYPE] Set Source Type Current';

export class SetSourceTypeSelectedAction implements Action {
    readonly type = SET_SOURCE_TYPE_SELECTED_ACTION;

    constructor(public payload: SourceTypeElement) {}
}

export type SourceTypeStateActions = SetSourceTypeSelectedAction;
