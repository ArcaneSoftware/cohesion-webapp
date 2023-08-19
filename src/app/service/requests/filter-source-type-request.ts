import { FilterableField } from 'src/app/models/Filtering/filterable-field';

export interface FilterSourceTypeRequest {
    sourceTypeId: FilterableField | null;
    sourceTypeName: FilterableField | null;
    sourceTypeDescription: FilterableField | null;
}
