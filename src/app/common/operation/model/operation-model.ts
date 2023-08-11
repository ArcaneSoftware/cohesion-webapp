import { OperationMode } from './operation-mode';

export class OperationModel {
  operationMode: OperationMode = OperationMode.Filter;
  isEnableSave: boolean = false;
  isEnableRemove: boolean = false;
}
