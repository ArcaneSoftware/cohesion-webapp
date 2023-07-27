import { Component, OnInit } from '@angular/core';
import { SourceElement } from '../../models/source-element';
import { MatTableDataSource } from '@angular/material/table';
import { SourceTypeElement } from '../../models/source-type-element';
import { SourceMessageService } from '../service/sourceMessage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SourceHttpService } from '../service/sourceHttp.service';
import { HttpErrorResponse } from '@angular/common/http';
import { take, catchError, Observable } from 'rxjs';
import APP_SETTINGS from 'src/app/settings/app-settings';
import { SourcesResponse } from '../service/reponses/sources-response';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-source-type-detail',
  templateUrl: './source-type-detail.component.html',
  styleUrls: ['./source-type-detail.component.scss'],
})
export class SourceTypeDetailComponent implements OnInit {
  orignalSourceType: SourceTypeElement = new SourceTypeElement();
  selectedSourceType: SourceTypeElement = new SourceTypeElement();

  sourceSelection = new SelectionModel<SourceElement>(true, []);
  sourceTable: MatTableDataSource<SourceElement> = new MatTableDataSource();
  sourceColumns = ['SelectAction', 'SourceName', 'Address', 'MoreActions'];

  constructor(private sourceMessageService: SourceMessageService, private sourceHttpSerive: SourceHttpService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.sourceMessageService.currentSourceType.subscribe((currentSourceType) => {
      this.orignalSourceType = currentSourceType;
      this.selectedSourceType = Object.assign({}, currentSourceType);

      if (this.orignalSourceType.sourceTypeId != null) {
        this.fetchSources();
      }
    });
  }

  onDeleteSourceType() {}

  onRestoreSourceTypeElementName() {
    this.selectedSourceType.sourceTypeName = this.orignalSourceType.sourceTypeName;
  }

  onSaveCurrentSourceType() {}

  onCurrentSourceTypeChange() {}

  getDisplaySourceTypeName(): string {
    if (this.selectedSourceType.sourceTypeId == null) {
      return 'Source Type Name';
    } else {
      return this.selectedSourceType.sourceTypeName;
    }
  }

  getDisplaySourceTypeDescription(): string {
    if (this.selectedSourceType.sourceTypeId == null) {
      return 'Source Type Description';
    } else {
      return this.selectedSourceType.sourceTypeDescription;
    }
  }

  fetchSources() {
    this.sourceHttpSerive
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
