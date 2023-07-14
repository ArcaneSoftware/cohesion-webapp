import { Component, OnInit, ViewChild } from '@angular/core';
import { SourceTypeElement, DEMO_SOURCE_TYPES } from '../models/source-type-element';
import { SourceElement, DEMO_SOURCES } from '../models/source-element';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

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
  _sourceTypes: SourceTypeElement[] = DEMO_SOURCE_TYPES;
  _sourceTypeColumns = ['SourceTypeName'];
  _sourceTypeExpandedColumns = [...this._sourceTypeColumns, 'ExpandAction'];
  _sourceTypeExpandedElement: SourceTypeElement | null = null;

  _sources: MatTableDataSource<SourceElement> = new MatTableDataSource(DEMO_SOURCES);
  _sourceColumns = ['SourceName', 'Address'];

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this._sources = new MatTableDataSource(DEMO_SOURCES);
  }

  onClickSourceTypeRow(message: string) {
    this._snackBar.open(message, 'close');
  }
}
