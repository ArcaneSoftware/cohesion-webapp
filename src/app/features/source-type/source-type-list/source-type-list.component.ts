import { Component, OnInit } from '@angular/core';
import { SourceTypeElement } from '../../../models/source-type/source-type-element';
import { SourceTypesResponse } from '../../../service/reponses/source-types-response';
import { Observable, Subject, catchError, take } from 'rxjs';
import APP_SETTINGS from '../../../settings/app-settings';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { WebapiService } from '../../../service/webapi.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as fromSource from '../state/source-type-state.reducer';
import { HttpErrorResponse } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { SetSourceTypeSelectedAction } from '../state/source-type-state.action';
import { SetOperationModeAction } from '../../../common/operation/state/operation-state.action';
import { OperationMode } from '../../../common/operation/model/operation-mode';

@Component({
  selector: 'app-source-type-list',
  templateUrl: './source-type-list.component.html',
  styleUrls: ['./source-type-list.component.scss'],
})
export class SourceTypeListComponent implements OnInit {
  private destroy$ = new Subject<void>();

  currentSourceType: SourceTypeElement = new SourceTypeElement();
  getAllSourceTypes$: Observable<SourceTypesResponse> = this.webapiService.getAllSourceTypes(APP_SETTINGS.baseApiUrl);

  sourceTypeSelection = new SelectionModel<SourceTypeElement>(true, []);

  sourceTypeDescription: string = '';

  sourceTypeTable: MatTableDataSource<SourceTypeElement> = new MatTableDataSource<SourceTypeElement>();
  sourceTypeColumns = ['SelectAction', 'SourceTypeName', 'MoreActions'];

  constructor(
    private store: Store<fromSource.State>,
    //private sourceTypeMessageService: SourceTypeMessageService,
    private webapiService: WebapiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // this.store
    //   .select(getOperationModeState)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((operationModeState) => {
    //     this.operationMode = operationModeState;
    //   });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadSourceTypes() {
    this.getAllSourceTypes$
      .pipe(
        take(1),
        catchError((error: HttpErrorResponse) => {
          this.snackBar.open(error.message, 'close', { duration: 2000 });

          console.error(error.message);

          return new Observable<never>();
        })
      )
      .subscribe((getAllSourceTypesResponse: SourceTypesResponse) => {
        let sourceTypes: SourceTypeElement[] = [];

        getAllSourceTypesResponse.sourceTypes.map((x, i) => {
          sourceTypes.push({
            position: i,
            sourceTypeId: x.sourceTypeId,
            sourceTypeName: x.sourceTypeName,
            sourceTypeDescription: x.sourceTypeDescription,
          });
        });

        this.sourceTypeTable = new MatTableDataSource(sourceTypes);
      });
  }

  onRefreshSourceTypes() {
    this.loadSourceTypes();
  }

  onAddSourceType() {
    this.store.dispatch(new SetOperationModeAction(OperationMode.Add));
  }

  onRemoveSourceTypes() {}

  onClickSourceTypeElement(soureType: SourceTypeElement) {
    this.currentSourceType = soureType;

    this.store.dispatch(new SetSourceTypeSelectedAction(soureType));
    this.store.dispatch(new SetOperationModeAction(OperationMode.Edit));
  }

  isAllSelected() {
    const numSelected = this.sourceTypeSelection.selected.length;
    const numRows = this.sourceTypeTable.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.sourceTypeSelection.clear();
      return;
    }

    this.sourceTypeSelection.select(...this.sourceTypeTable.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: SourceTypeElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.sourceTypeSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
