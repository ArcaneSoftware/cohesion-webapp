export enum FilterOperator {
  EqualTo = 'Equal To',
  NotEqualTo = 'Not Equal To',
  GreaterThan = 'Greater Than',
  GreaterThanOrEqual = 'Greater Than O rEqual',
  LessThan = 'Less Than',
  LessThanOrEqual = 'Less Than Or Equal',
  Contains = 'Contains',
}

export interface FilterableField {
  value: object | null;
  filterOperator: FilterOperator;
}
