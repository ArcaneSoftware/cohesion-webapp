import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from 'src/app/shared/material.modules';

export interface SourceTypeDialogData {
  model: string;
  sourceTypeName: string;
  sourceTypeDescription: string;
}

@Component({
  selector: 'source-type-dialog',
  templateUrl: 'source-type-dialog.html',
  styleUrls: ['source-type-dialog.scss'],
  standalone: true,
  imports: [MaterialModule],
})
export class SourceTypeDialog {
  constructor(public dialog: MatDialogRef<SourceTypeDialog>, @Inject(MAT_DIALOG_DATA) public data: SourceTypeDialogData, private snackBar: MatSnackBar) {}

  onOk() {
    this.snackBar.open(this.data.sourceTypeName, 'close');
    this.dialog.close();
  }
}
