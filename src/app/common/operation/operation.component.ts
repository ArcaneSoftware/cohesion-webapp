import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
import { SetEventAction, SetOperationModeAction } from './state/operation-state.action';
import { Subject, takeUntil } from 'rxjs';
import { getOperationIsSubjectChangedState, getOperationIsSubjectSelectedState, getOperationModeState } from '../../app.reducer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OperationEvent } from './models/operation-event';
import { OperationMode } from './models/operation-mode';

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
    canUndoOperation: boolean = false;
    isSubjectChanged: boolean = false;
    isSubjectSelected: boolean = false;

    constructor(
        private store: Store<fromRoot.State>,
        private snackBar: MatSnackBar,
    ) {}

    ngOnInit(): void {
        this.store
            .select(getOperationModeState)
            .pipe(takeUntil(this.destroy$))
            .subscribe((operationModeState) => {
                this.operationMode = operationModeState;

                this.enableOperationMode();
            });
        this.store
            .select(getOperationIsSubjectChangedState)
            .pipe(takeUntil(this.destroy$))
            .subscribe((isSubjectChanged) => {
                this.isSubjectChanged = isSubjectChanged;
            });
        this.store
            .select(getOperationIsSubjectSelectedState)
            .pipe(takeUntil(this.destroy$))
            .subscribe((isSubjectSelected) => {
                this.isSubjectSelected = isSubjectSelected;
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onFilter() {
        if (this.isFilterMode()) {
            //TODO: filter works
            this.operationMode = OperationMode.Edit;

            this.store.dispatch(new SetOperationModeAction(this.operationMode));
        } else {
            //TODO: enter into filter mode
            this.operationMode = OperationMode.Filter;

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
        this.store.dispatch(new SetEventAction(OperationEvent.Remove));
    }

    onSave() {}

    enableOperationMode() {
        if (this.isEditMode()) {
            this.canRefreshOperation = true;
            this.canRemoveOperation = true;
            this.canSaveOperation = true;
            this.canUndoOperation = true;
        }

        if (this.isAddMode()) {
            this.canRefreshOperation = false;
            this.canRemoveOperation = true;
            this.canSaveOperation = true;
            this.canUndoOperation = true;
        }

        if (this.isFilterMode()) {
            this.canRefreshOperation = false;
            this.canRemoveOperation = false;
            this.canSaveOperation = false;
            this.canUndoOperation = false;
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
