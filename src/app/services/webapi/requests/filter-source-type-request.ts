import { FilterableField } from 'src/app/common/filtering/filterable-field';

export interface FilterSourceTypeRequest {
    sourceTypeId: FilterableField | null;
    sourceTypeName: FilterableField | null;
    sourceTypeDescription: FilterableField | null;
}
