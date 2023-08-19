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
    fieldName: string;
    filterOperator: FilterOperator;
    value: any | null;
}
