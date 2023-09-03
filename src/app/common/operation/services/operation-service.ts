import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OperationEvent } from '../models/operation-event';
import { OperationMode } from '../models/operation-mode';

@Injectable({
    providedIn: 'root',
})
export class OperationService {
    private OperationModeSubject = new Subject<OperationMode>();
    private operationEventSubject = new Subject<OperationEvent>();

    operationModeObservable$ = this.OperationModeSubject.asObservable();
    operationEventObservable$ = this.operationEventSubject.asObservable();

    emitOperationMode(operationMode: OperationMode) {
        this.OperationModeSubject.next(operationMode);
    }

    emitOperationEvent(operationEvent: OperationEvent) {
        this.operationEventSubject.next(operationEvent);
    }
}
