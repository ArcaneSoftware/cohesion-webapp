import { Component, OnInit } from '@angular/core';
import { SourceTypeElement } from '../models/source-type-element';
import { SourceElement, DEMO_SOURCES } from '../models/source-element';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { SourceService } from './service/source.service';
import * as fromSource from './state/source-state.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { SourceTypesResponse } from './service/reponses/source-types-response';
import APP_SETTINGS from 'src/app/settings/app-settings';
import { SelectedSourceType } from './state/source-state.action';
import { SourcesResponse } from './service/reponses/sources-response';
import { SourceTypeDialog } from './create-source-type/source-type-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SourceComponent implements OnInit {
  selectedSourceType: SourceTypeElement = new SourceTypeElement();
  getAllSourceTypes$: Observable<SourceTypesResponse> = this.sourceSerive.getAllSourceTypes(APP_SETTINGS.baseApiUrl);

  sourceTypeDescription: string = '';

  sourceTypeElements: MatTableDataSource<SourceTypeElement> = new MatTableDataSource<SourceTypeElement>();
  sourceTypeColumns = ['SourceTypeName'];
  sourceTypeExpandedColumns = [...this.sourceTypeColumns, 'ExpandAction'];
  sourceTypeExpandedElement: SourceTypeElement | null = null;

  sourceElements: MatTableDataSource<SourceElement> = new MatTableDataSource();
  sourceColumns = ['SourceName', 'Address'];

  constructor(private store: Store<fromSource.State>, private sourceSerive: SourceService, private snackBar: MatSnackBar, private dialog: MatDialog) {
    console.log('[SourceComponent] CONSTRUCT');
  }

  ngOnInit(): void {
    this.loadAllSourceTypes();
  }

  loadAllSourceTypes() {
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

        getAllSourceTypesResponse.sourceTypes.map((x) => {
          sourceTypes.push({
            sourceTypeId: x.sourceTypeId,
            sourceTypeName: x.sourceTypeName,
            sourceTypeDescription: x.sourceTypeDescription,
          });
        });

        this.sourceTypeElements = new MatTableDataSource(sourceTypes);
      });
  }

  onClickSourceTypeElement(soureTypeElement: SourceTypeElement) {
    this.selectedSourceType = soureTypeElement;

    this.sourceSerive
      .getSourcesBySourceTypeId(APP_SETTINGS.baseApiUrl, soureTypeElement.sourceTypeId)
      .pipe(
        take(1),
        catchError((error: HttpErrorResponse) => {
          this.snackBar.open(error.message, 'close', { duration: 2000 });

          console.error(error.message);

          return new Observable<never>();
        })
      )
      .subscribe((sourcesResponse: SourcesResponse) => {
        let sourceElements: SourceElement[] = [];

        sourcesResponse.sources.map((e) => {
          sourceElements.push({
            sourceId: e.sourceId,
            sourceName: e.sourceName,
            sourceTypeName: e.sourceTypeName,
            address: e.address,
          });
        });

        this.sourceElements = new MatTableDataSource(sourceElements);
      });

    this.store.dispatch(new SelectedSourceType(soureTypeElement));
  }

  onCreateSourceType() {
    this.dialog.open(SourceTypeDialog, {
      width: '800px',
      height: '400px',
      data: {
        model: 'create',
        sourceTypeName: this.selectedSourceType.sourceTypeName,
        sourceTypeDescription: this.sourceTypeDescription,
      },
    });
  }

  onDeleteSourceType() {}

  onDeleteSelectedSourceTypeElementName() {
    this.selectedSourceType.sourceTypeName = '';
  }
}
