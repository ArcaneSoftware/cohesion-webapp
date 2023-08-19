import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SourceElement } from '../../../models/source/source-element';
import { MatTableDataSource } from '@angular/material/table';
import { SourceTypeElement } from '../../../models/source-type/source-type-element';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebapiService } from '../../../service/webapi.service';
import { HttpErrorResponse } from '@angular/common/http';
import { take, catchError, Observable, takeUntil, Subject } from 'rxjs';
import APP_SETTINGS from 'src/app/settings/app-settings';
import { SourcesResponse } from '../../../service/reponses/source/sources-response';
import { SelectionModel } from '@angular/cdk/collections';
import { getOperationEventState, getSourceTypeSelectedState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import { OperationMode } from '../../../common/operation/operation-mode';
import { FilterOperator, FilterableField } from 'src/app/models/Filtering/filterable-field';
import { INITIAL_SOURCE_TYPE_ELEMENT } from 'src/app/constant/constant';
import { OperationEvent } from 'src/app/common/operation-event';

@Component({
    selector: 'app-source-type-detail',
    templateUrl: './source-type-detail.component.html',
    styleUrls: ['./source-type-detail.component.scss'],
})
export class SourceTypeDetailComponent implements OnInit, OnChanges {
    private destroy$ = new Subject<void>();

    @Input() operationMode: OperationMode = OperationMode.Filter;
    @Input() operationEvent: OperationEvent | null = null;
    @Output() filterableFieldsChanged = new EventEmitter<{ [key: string]: FilterableField }>();

    filterableFields: { [key: string]: FilterableField } = {};
    orignalSourceType: SourceTypeElement = INITIAL_SOURCE_TYPE_ELEMENT;
    selectedSourceType: SourceTypeElement = {
        position: 0,
        sourceTypeId: '',
        sourceTypeName: '',
        sourceTypeDescription: '',
    };

    sourceSelection = new SelectionModel<SourceElement>(true, []);
    sourceTable: MatTableDataSource<SourceElement> = new MatTableDataSource();
    sourceColumns = ['SelectAction', 'SourceName', 'Address', 'MoreActions'];

    constructor(
        private store: Store<fromRoot.State>,
        private webapiService: WebapiService,
        private snackBar: MatSnackBar,
    ) {}

    ngOnInit(): void {
        this.store
            .select(getSourceTypeSelectedState)
            .pipe(takeUntil(this.destroy$))
            .subscribe((sourceTypeSelected) => {
                if (sourceTypeSelected.sourceTypeId == null) {
                    return;
                }

                this.orignalSourceType = sourceTypeSelected;
                this.selectedSourceType = Object.assign({}, sourceTypeSelected);

                this.fetchSources();
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['operationMode']) {
            if (changes['operationMode'].currentValue == OperationMode.Filter) {
                this.launchFilterMode();
            }

            if (changes['operationMode'].currentValue == OperationMode.Edit) {
                this.launchEditMode();
            }
        }

        if (changes['operationEvent']) {
            if (changes['operationEvent'].currentValue == OperationEvent.Save) {
            }
            if (changes['operationEvent'].currentValue == OperationEvent.Undo) {
            }
        }
    }

    onRestoreSourceTypeElementName() {
        this.selectedSourceType.sourceTypeName = this.orignalSourceType.sourceTypeName;
    }

    onSaveCurrentSourceType() {}

    onCurrentSourceTypeChange() {}

    launchFilterMode() {
        this.sourceSelection.clear();
        this.orignalSourceType = INITIAL_SOURCE_TYPE_ELEMENT;
        this.sourceTable = new MatTableDataSource();

        this.selectedSourceType.sourceTypeId =
            this.filterableFields['sourceTypeId'] != null ? this.filterableFields['sourceTypeId'].value : INITIAL_SOURCE_TYPE_ELEMENT.sourceTypeId;
        this.selectedSourceType.sourceTypeName =
            this.filterableFields['sourceTypeName'] != null ? this.filterableFields['sourceTypeName'].value : INITIAL_SOURCE_TYPE_ELEMENT.sourceTypeName;
        this.selectedSourceType.sourceTypeDescription =
            this.filterableFields['sourceTypeDescription'] != null
                ? this.filterableFields['sourceTypeDescription'].value
                : INITIAL_SOURCE_TYPE_ELEMENT.sourceTypeDescription;
    }

    launchEditMode() {
        if (this.selectedSourceType.sourceTypeId != null) {
            this.filterableFields['sourceTypeId'] = {
                fieldName: 'sourceTypeId',
                filterOperator: FilterOperator.EqualTo,
                value: this.selectedSourceType.sourceTypeId,
            };
        }
        if (this.selectedSourceType.sourceTypeName != null) {
            this.filterableFields['sourceTypeName'] = {
                fieldName: 'sourceTypeName',
                filterOperator: FilterOperator.EqualTo,
                value: this.selectedSourceType.sourceTypeName,
            };
        }
        if (this.selectedSourceType.sourceTypeDescription != null) {
            this.filterableFields['sourceTypeDescription'] = {
                fieldName: 'sourceTypeDescription',
                filterOperator: FilterOperator.EqualTo,
                value: this.selectedSourceType.sourceTypeDescription,
            };
        }

        this.filterableFieldsChanged.emit(this.filterableFields);
    }

    launchAddMode() {
        this.sourceSelection.clear();
        this.orignalSourceType = INITIAL_SOURCE_TYPE_ELEMENT;
        this.selectedSourceType = INITIAL_SOURCE_TYPE_ELEMENT;
        this.sourceTable = new MatTableDataSource();
    }

    subscribeOperationState() {}

    fetchSources() {
        this.webapiService
            .getSourcesBySourceTypeId(APP_SETTINGS.baseApiUrl, this.orignalSourceType.sourceTypeId!)
            .pipe(
                take(1),
                catchError((error: HttpErrorResponse) => {
                    this.snackBar.open(error.message, 'close', { duration: 5000 });

                    console.error(error.message);

                    return new Observable<never>();
                }),
            )
            .subscribe((sourcesResponse: SourcesResponse) => {
                let sources: SourceElement[] = [];

                sourcesResponse.sources.map((e, i) => {
                    sources.push({
                        position: i,
                        sourceId: e.sourceId,
                        sourceName: e.sourceName,
                        sourceTypeName: e.sourceTypeName,
                        address: e.address,
                    });
                });

                this.sourceTable = new MatTableDataSource(sources);
            });
    }

    isChange() {
        return JSON.stringify(this.selectedSourceType) !== JSON.stringify(this.orignalSourceType);
    }

    isFilterMode() {
        return this.operationMode == OperationMode.Filter;
    }

    isAllSelected() {
        const numSelected = this.sourceSelection.selected.length;
        const numRows = this.sourceTable.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.sourceSelection.clear();
            return;
        }

        this.sourceSelection.select(...this.sourceTable.data);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: SourceElement): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.sourceSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }
}
