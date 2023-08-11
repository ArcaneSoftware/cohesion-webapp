import { FilterableField } from 'src/app/models/Filtering/filterable-field';

export class FilterSourceTypeRequest {
    sourceTypeId: FilterableField | null = null;
    sourceTypeName: FilterableField | null = null;
    sourceTypeDescription: FilterableField | null = null;
}
