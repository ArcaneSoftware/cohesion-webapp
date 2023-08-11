import { Action } from '@ngrx/store';
import { SourceTypeElement } from '../../../models/source-type/source-type-element';
import { FilterSourceTypeRequest } from 'src/app/service/requests/filter-source-type-request';

export const SET_SOURCE_TYPE_SELECTED_ACTION = '[SOURCE-TYPE] Set Source Type Current';
export const SET_SOURCE_TYPE_FILTER_REQUEST_ACTION = '[SOURCE-TYPE] Set Source Type Filter Request';

export class SetSourceTypeSelectedAction implements Action {
    readonly type = SET_SOURCE_TYPE_SELECTED_ACTION;

    constructor(public payload: SourceTypeElement) {}
}

export class SetSourceTypeFilterRequestAction implements Action {
    readonly type = SET_SOURCE_TYPE_FILTER_REQUEST_ACTION;

    constructor(public payload: FilterSourceTypeRequest) {}
}

export type SourceTypeStateActions = SetSourceTypeSelectedAction | SetSourceTypeFilterRequestAction;
