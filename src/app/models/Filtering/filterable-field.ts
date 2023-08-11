export enum FilterOperator {
    EqualTo = 'EqualTo',
    NotEqualTo = 'NotEqualTo',
    GreaterThan = 'GreaterThan',
    GreaterThanOrEqual = 'GreaterThanOrEqual',
    LessThan = 'LessThan',
    LessThanOrEqual = 'LessThanOrEqual',
    Contains = 'Contains',
}

export interface FilterableField {
    value: any | null;
    filterOperator: FilterOperator;
}
