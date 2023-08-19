import { SourceTypeModel } from '../../../models/source-type/source-type-model';

export interface QuerySourceTypesResponse {
    isSuccessful: boolean;
    message: string;
    sourceTypes: SourceTypeModel[];
}
