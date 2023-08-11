import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { OperationModel } from '../model/operation-model';
import { OperationMode } from '../model/operation-mode';

@Injectable({
  providedIn: 'root',
})
export class OperationBarMessageService {
  private modeSubject = new Subject<OperationMode>();
  private isEnableSaveSubject = new Subject<boolean>();

  operationObserver = this.modeSubject.asObservable();
  isEnableSaveObserver = this.isEnableSaveSubject.asObservable();

  constructor() {}

  selectOperation(operation: OperationMode) {
    this.modeSubject.next(operation);
  }

  selectIsEnableSave(isEnableSave: boolean) {
    this.isEnableSaveSubject.next(isEnableSave);
  }
}
