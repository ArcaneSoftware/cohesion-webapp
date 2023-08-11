import { Component, OnInit } from '@angular/core';
import { OperationMode } from './model/operation-mode';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
import { SetOperationModeAction } from './state/operation-state.action';
import { Subject, takeUntil } from 'rxjs';
import { getOperationCanSaveState, getOperationIsContentChangedState, getOperationModeState } from '../../app.reducer';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss'],
})
export class OperationComponent implements OnInit {
  private destroy$ = new Subject<void>();

  operationMode: OperationMode = OperationMode.Filter;
  canFilterOperation: boolean = true;
  canRefreshOperation: boolean = false;
  canRemoveOperation: boolean = false;
  canSaveOperation: boolean = false;
  isContentChanged: boolean = false;

  constructor(private store: Store<fromRoot.State>, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.subscribeOperationState();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  subscribeOperationState() {
    this.store
      .select(getOperationModeState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((operationModeState) => {
        this.operationMode = operationModeState;

        this.enableOperationMode();
      });
    this.store
      .select(getOperationCanSaveState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((canSaveOperationState) => {
        this.canSaveOperation = canSaveOperationState;
      });
    this.store
      .select(getOperationIsContentChangedState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((isContentChanged) => {
        this.isContentChanged = isContentChanged;
      });
  }

  onFilter() {
    if (this.isFilterMode()) {
      //TODO: filter works
      this.operationMode = OperationMode.Edit;

      this.snackBar.open('Filter works');

      this.store.dispatch(new SetOperationModeAction(this.operationMode));
    } else {
      //TODO: enter into filter mode
      this.operationMode = OperationMode.Filter;

      this.snackBar.open('Enter into filter mode');

      this.store.dispatch(new SetOperationModeAction(this.operationMode));
    }
  }

  onRefresh() {
    this.operationMode = OperationMode.Edit;

    this.store.dispatch(new SetOperationModeAction(this.operationMode));
  }

  onAdd() {
    this.operationMode = OperationMode.Add;

    this.store.dispatch(new SetOperationModeAction(this.operationMode));
  }

  onRemove() {
    if (this.isEditMode()) {
      this.snackBar.open('Remove this from DB');
    }

    if (this.isAddMode()) {
      this.snackBar.open('Clean it from UI');
    }

    this.onRefresh();
  }

  onSave() {}

  enableOperationMode() {
    if (this.isEditMode()) {
      this.canRefreshOperation = true;
      this.canRemoveOperation = true;
      this.canSaveOperation = true;
    }

    if (this.isAddMode()) {
      this.canRefreshOperation = false;
      this.canRemoveOperation = true;
      this.canSaveOperation = true;
    }

    if (this.isFilterMode()) {
      this.canRefreshOperation = false;
      this.canRemoveOperation = false;
      this.canSaveOperation = false;
    }
  }

  isFilterMode(): boolean {
    return this.operationMode == OperationMode.Filter;
  }

  isAddMode(): boolean {
    return this.operationMode == OperationMode.Add;
  }

  isEditMode(): boolean {
    return this.operationMode == OperationMode.Edit;
  }
}
