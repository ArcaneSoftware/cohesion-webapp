import { Component, OnInit } from '@angular/core';
import { SourceTypeElement } from '../models/source-type-element';
import { SourceElement } from '../models/source-element';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { SourceHttpService } from './service/sourceHttp.service';
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
import { SourceMessageService } from './service/sourceMessage.service';

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
  currentSourceType: SourceTypeElement = new SourceTypeElement();
  getAllSourceTypes$: Observable<SourceTypesResponse> = this.sourceHttpSerive.getAllSourceTypes(APP_SETTINGS.baseApiUrl);

  constructor(
    private store: Store<fromSource.State>,
    private sourceHttpSerive: SourceHttpService,
    private sourceMessageService: SourceMessageService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.sourceMessageService.currentSourceType.subscribe((currentSourceType) => (this.currentSourceType = currentSourceType));
  }

  onDeleteSourceType() {}

  getDisplaySourceTypeName(): string {
    if (this.currentSourceType.sourceTypeId == null) {
      return 'Source Type Name';
    } else {
      return this.currentSourceType.sourceTypeName;
    }
  }

  getDisplaySourceTypeDescription(): string {
    if (this.currentSourceType.sourceTypeId == null) {
      return 'Source Type Description';
    } else {
      return this.currentSourceType.sourceTypeDescription;
    }
  }
}
