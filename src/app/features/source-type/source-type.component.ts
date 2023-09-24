import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, Subject, catchError, take } from 'rxjs';
import * as fromSource from './state/source-type-state.reducer';
import { HttpErrorResponse } from '@angular/common/http';
import { OperationEvent } from 'src/app/common/operation/models/operation-event';
import { FilterableField } from 'src/app/common/filtering/filterable-field';
import { OperationMode } from 'src/app/common/operation/models/operation-mode';
import { QuerySourceTypesResponse } from 'src/app/services/webapi/reponses/source-type/query-source-types-response';
import { FilterSourceTypeRequest } from 'src/app/services/webapi/requests/filter-source-type-request';
import { WebapiService } from 'src/app/services/webapi/webapi.service';
import { SourceTypeElement } from './models/source-type-element';
import { AppSettingsService } from 'src/app/services/app-settings/app-settings.service';
import { OperationService } from 'src/app/common/operation/services/operation-service';

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
        private appSettingsService: AppSettingsService,
        private operationService: OperationService,
        private store: Store<fromSource.State>,
        private webapiService: WebapiService,
        private snackBar: MatSnackBar,
    ) {
        this.operationService.operationEventObservable$.subscribe((operationEvent) => {
            this.operationEvent = operationEvent;
        });

        this.operationService.operationModeObservable$.subscribe((operationMode) => {
            this.operationMode = operationMode;
        });
    }

    ngOnInit(): void {}

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
            .filterSourceTypes(this.appSettingsService.baseApiUrl, request)
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
