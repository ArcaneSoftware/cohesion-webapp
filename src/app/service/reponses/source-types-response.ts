import { SourceTypeModel } from '../../models/source-type/source-type-model';

export interface SourceTypesResponse {
    isSuccessful: boolean;
    message: string;
    sourceTypes: SourceTypeModel[];
}
