import { SourceTypeModel } from '../../models/source-type-model';

export interface QuerySourceTypesResponse {
    isSuccessful: boolean;
    message: string;
    sourceTypes: SourceTypeModel[];
}
