import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SourceTypeElement } from '../models/source-type-element';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private behaviorSubject = new BehaviorSubject(new SourceTypeElement());

  currentSourceType = this.behaviorSubject.asObservable();

  constructor() {}

  selectSourceType(sourceType: SourceTypeElement) {
    this.behaviorSubject.next(sourceType);
  }
}
