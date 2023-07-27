import { Component, Input, OnInit } from '@angular/core';
import { SourceTypeElement } from '../../models/source-type-element';
import { SourceTypesResponse } from '../../service/reponses/source-types-response';
import { Observable, catchError, take } from 'rxjs';
import APP_SETTINGS from 'src/app/settings/app-settings';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { WebapiService } from '../../service/webapi.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import * as fromSource from '../state/source-type-state.reducer';
import { HttpErrorResponse } from '@angular/common/http';
import { SourceTypeDialog } from '../create-source-type/source-type-dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MessageService } from '../../service/message.service';
import { SelectionModel } from '@angular/cdk/collections';
import { SelectedSourceType } from '../state/source-type-state.action';

@Component({
  selector: 'app-source-type-list',
  templateUrl: './source-type-list.component.html',
  styleUrls: ['./source-type-list.component.scss'],
})
export class SourceTypeListComponent implements OnInit {
  @Input() inputedSourceTypeId!: number;
  @Input() inputedSourceTypeName!: string;

  currentSourceType: SourceTypeElement = new SourceTypeElement();
  getAllSourceTypes$: Observable<SourceTypesResponse> = this.httpService.getAllSourceTypes(APP_SETTINGS.baseApiUrl);

  sourceTypeSelection = new SelectionModel<SourceTypeElement>(true, []);

  sourceTypeDescription: string = '';

  sourceTypeTable: MatTableDataSource<SourceTypeElement> = new MatTableDataSource<SourceTypeElement>();
  sourceTypeColumns = ['SelectAction', 'SourceTypeName', 'MoreActions'];

  constructor(
    private store: Store<fromSource.State>,
    private messageService: MessageService,
    private httpService: WebapiService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadSourceTypes();
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

  onClickSourceTypeElement(soureType: SourceTypeElement) {
    this.currentSourceType = soureType;

    this.messageService.selectSourceType(this.currentSourceType);
    this.store.dispatch(new SelectedSourceType(soureType));
  }

  onCreateSourceType() {
    this.dialog.open(SourceTypeDialog, {
      width: '800px',
      height: '400px',
      data: {
        model: 'create',
        sourceTypeName: this.currentSourceType.sourceTypeName,
        sourceTypeDescription: this.sourceTypeDescription,
      },
    });
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
