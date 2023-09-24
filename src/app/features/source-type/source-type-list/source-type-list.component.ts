import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import * as fromSource from '../state/source-type-state.reducer';
import { SelectionModel } from '@angular/cdk/collections';
import { SetSourceTypeSelectedAction } from '../state/source-type-state.action';
import { SetIsSubjectSelectedAction } from 'src/app/common/operation/state/operation-state.action';
import { INITIAL_SOURCE_TYPE_ELEMENT } from 'src/app/constant/constant';
import { OperationEvent } from 'src/app/common/operation/models/operation-event';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OperationMode } from 'src/app/common/operation/models/operation-mode';
import { SourceTypeElement } from '../models/source-type-element';
import { AppSettingsService } from 'src/app/services/app-settings/app-settings.service';
import { OperationService } from 'src/app/common/operation/services/operation-service';

@Component({
    selector: 'app-source-type-list',
    templateUrl: './source-type-list.component.html',
    styleUrls: ['./source-type-list.component.scss'],
})
export class SourceTypeListComponent implements OnInit, OnChanges {
    operationMode: OperationMode = OperationMode.Filter;
    operationEvent: OperationEvent | null = null;
    @Input() sourceTypes: SourceTypeElement[] = [];

    currentSourceTypeElement: SourceTypeElement = INITIAL_SOURCE_TYPE_ELEMENT;
    sourceTypeSelection = new SelectionModel<SourceTypeElement>(true, []);

    sourceTypeTable: MatTableDataSource<SourceTypeElement> = new MatTableDataSource<SourceTypeElement>();
    sourceTypeColumns = ['SelectAction', 'SourceTypeName', 'MoreActions'];

    constructor(
        private appSettingsService: AppSettingsService,
        private operationService: OperationService,
        private store: Store<fromSource.State>,
        private snackBar: MatSnackBar,
    ) {
        this.operationService.operationModeObservable$.subscribe((operationMode) => {
            this.operationMode = operationMode;

            if (this.operationMode == OperationMode.Filter) {
                this.sourceTypeTable = new MatTableDataSource();
                this.sourceTypeSelection.clear();
            }
        });

        this.operationService.operationEventObservable$.subscribe((operationEvent) => {
            this.operationEvent = operationEvent;

            if (this.operationEvent == OperationEvent.Remove) {
                this.handleRemoveEvent();
            }
            if (this.operationEvent == OperationEvent.Refresh) {
                this.handleRefreshEvent();
            }
        });
    }

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['sourceTypes']) {
            this.sourceTypeTable = new MatTableDataSource<SourceTypeElement>(this.sourceTypes);
        }
    }

    onClickSourceTypeElement(soureTypeElement: SourceTypeElement) {
        this.currentSourceTypeElement = soureTypeElement;

        this.store.dispatch(new SetSourceTypeSelectedAction(soureTypeElement));
    }

    onCheckSourceTypeElement(event: MatCheckboxChange, sourceTypeElement: SourceTypeElement) {
        event.checked ? this.sourceTypeSelection.select(sourceTypeElement) : this.sourceTypeSelection.deselect(sourceTypeElement);

        this.store.dispatch(new SetIsSubjectSelectedAction(this.sourceTypeSelection.hasValue()));
    }

    onToggleAllSourceTypeElements() {
        if (this.isAllSelected()) {
            this.sourceTypeSelection.clear();
        } else {
            this.sourceTypeSelection.select(...this.sourceTypeTable.data);
        }

        this.store.dispatch(new SetIsSubjectSelectedAction(this.sourceTypeSelection.hasValue()));
    }

    handleRemoveEvent() {
        this.snackBar.open(this.appSettingsService.baseApiUrl, 'close', { duration: 5000 });
    }

    handleRefreshEvent() {
        this.snackBar.open('respose REFRESH', 'close', { duration: 5000 });
    }

    isAllSelected() {
        const numSelected = this.sourceTypeSelection.selected.length;
        const numRows = this.sourceTypeTable.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */

    /** The label for the checkbox on the passed row */
    // checkboxLabel(row?: SourceTypeElement): string {
    //     if (!row) {
    //         return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    //     }
    //     return `${this.sourceTypeSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    // }
}
