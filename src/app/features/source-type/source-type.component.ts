import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, Subject, catchError, take, takeUntil } from 'rxjs';
import { OperationMode } from 'src/app/common/operation/operation-mode';
import { FilterSourceTypeRequest } from 'src/app/service/requests/filter-source-type-request';
import { WebapiService } from 'src/app/service/webapi.service';
import * as fromSource from './state/source-type-state.reducer';
import { getOperationEventState, getOperationModeState } from 'src/app/app.reducer';
import { HttpErrorResponse } from '@angular/common/http';
import { SourceTypeElement } from 'src/app/models/source-type/source-type-element';
import { QuerySourceTypesResponse } from 'src/app/service/reponses/source-type/query-source-types-response';
import APP_SETTINGS from 'src/app/settings/app-settings';
import { FilterableField } from 'src/app/models/Filtering/filterable-field';
import { OperationEvent } from 'src/app/common/operation-event';

@Component({
    selector: 'app-source-type',
    templateUrl: './source-type.component.html',
    styleUrls: ['./source-type.component.scss'],
})
export class SourceTypeComponent implements OnInit {
    private destroy$ = new Subject<void>();

    operationEvent: OperationEvent | null = null;
    operationMode: OperationMode = OperationMode.Filter;
    sourceTypes: SourceTypeElement[] = [];

    constructor(
        private store: Store<fromSource.State>,
        private webapiService: WebapiService,
        private snackBar: MatSnackBar,
    ) {}

    ngOnInit(): void {
        this.store
            .select(getOperationModeState)
            .pipe(takeUntil(this.destroy$))
            .subscribe((operationMode) => {
                this.operationMode = operationMode;
            });

        this.store
            .select(getOperationEventState)
            .pipe(takeUntil(this.destroy$))
            .subscribe((operationEvent) => {
                if (operationEvent == null) {
                    return;
                }

                this.operationEvent = operationEvent;
            });
    }

    filterSourceTypes(filterableFields: { [key: string]: FilterableField }) {
        const request: FilterSourceTypeRequest = {
            sourceTypeId:
                filterableFields['sourceTypeId'] != null
                    ? {
                          fieldName: filterableFields['sourceTypeId']?.fieldName,
                          filterOperator: filterableFields['sourceTypeId'].filterOperator,
                          value: filterableFields['sourceTypeId'].value,
                      }
                    : null,
            sourceTypeName:
                filterableFields['sourceTypeName'] != null
                    ? {
                          fieldName: filterableFields['sourceTypeName']?.fieldName,
                          filterOperator: filterableFields['sourceTypeName'].filterOperator,
                          value: filterableFields['sourceTypeName'].value,
                      }
                    : null,
            sourceTypeDescription:
                filterableFields['sourceTypeDescription'] != null
                    ? {
                          fieldName: filterableFields['sourceTypeDescription']?.fieldName,
                          filterOperator: filterableFields['sourceTypeDescription'].filterOperator,
                          value: filterableFields['sourceTypeDescription'].value,
                      }
                    : null,
        };

        this.webapiService
            .filterSourceTypes(APP_SETTINGS.baseApiUrl, request)
            .pipe(
                take(1),
                catchError((error: HttpErrorResponse) => {
                    this.snackBar.open(error.message, 'close', { duration: 2000 });

                    console.error(error.message);

                    return new Observable<never>();
                }),
            )
            .subscribe((filterSourceTypesResponse: QuerySourceTypesResponse) => {
                this.sourceTypes = [];

                filterSourceTypesResponse.sourceTypes.map((x, i) => {
                    this.sourceTypes.push({
                        position: i,
                        sourceTypeId: x.sourceTypeId,
                        sourceTypeName: x.sourceTypeName,
                        sourceTypeDescription: x.sourceTypeDescription,
                    });
                });
            });
    }
}
