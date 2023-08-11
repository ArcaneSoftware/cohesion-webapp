import { Component, OnInit } from '@angular/core';
import { SourceElement } from '../../../models/source/source-element';
import { MatTableDataSource } from '@angular/material/table';
import { SourceTypeElement } from '../../../models/source-type/source-type-element';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebapiService } from '../../../service/webapi.service';
import { HttpErrorResponse } from '@angular/common/http';
import { take, catchError, Observable, takeUntil, Subject } from 'rxjs';
import APP_SETTINGS from 'src/app/settings/app-settings';
import { SourcesResponse } from '../../../service/reponses/sources-response';
import { SelectionModel } from '@angular/cdk/collections';
import { getOperationModeState, getSourceTypeSelectedState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import { OperationMode } from '../../../common/operation/model/operation-mode';

@Component({
  selector: 'app-source-type-detail',
  templateUrl: './source-type-detail.component.html',
  styleUrls: ['./source-type-detail.component.scss'],
})
export class SourceTypeDetailComponent implements OnInit {
  private destroy$ = new Subject<void>();

  operationMode: string = OperationMode.Filter;
  orignalSourceType: SourceTypeElement = new SourceTypeElement();
  selectedSourceType: SourceTypeElement = new SourceTypeElement();

  sourceSelection = new SelectionModel<SourceElement>(true, []);
  sourceTable: MatTableDataSource<SourceElement> = new MatTableDataSource();
  sourceColumns = ['SelectAction', 'SourceName', 'Address', 'MoreActions'];

  constructor(private store: Store<fromRoot.State>, private webapiService: WebapiService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.subscribeOperationState();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onRestoreSourceTypeElementName() {
    this.selectedSourceType.sourceTypeName = this.orignalSourceType.sourceTypeName;
  }

  onSaveCurrentSourceType() {}

  onCurrentSourceTypeChange() {}

  launchFilterMode() {
    this.sourceSelection.clear();
    this.orignalSourceType = new SourceTypeElement();
    this.selectedSourceType = new SourceTypeElement();
    this.sourceTable = new MatTableDataSource();
  }

  launchEditMode() {}

  launchAddMode() {
    this.sourceSelection.clear();
    this.orignalSourceType = new SourceTypeElement();
    this.selectedSourceType = new SourceTypeElement();
    this.sourceTable = new MatTableDataSource();
  }

  subscribeOperationState() {
    this.store
      .select(getSourceTypeSelectedState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((sourceTypeSelected) => {
        this.orignalSourceType = sourceTypeSelected;
        this.selectedSourceType = Object.assign({}, sourceTypeSelected);

        if (this.orignalSourceType.sourceTypeId != null) {
          this.fetchSources();
        }
      });
    this.store
      .select(getOperationModeState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((operationMode) => {
        this.operationMode = operationMode;

        if (operationMode == OperationMode.Filter) {
          this.launchFilterMode();
        }

        if (operationMode == OperationMode.Edit) {
          this.launchEditMode();
        }

        if (operationMode == OperationMode.Add) {
          this.launchAddMode();
        }
      });
  }

  fetchSources() {
    this.webapiService
      .getSourcesBySourceTypeId(APP_SETTINGS.baseApiUrl, this.orignalSourceType.sourceTypeId)
      .pipe(
        take(1),
        catchError((error: HttpErrorResponse) => {
          this.snackBar.open(error.message, 'close', { duration: 5000 });

          console.error(error.message);

          return new Observable<never>();
        })
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
