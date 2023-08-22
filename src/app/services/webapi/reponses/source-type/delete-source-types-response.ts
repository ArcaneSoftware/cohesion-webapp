import { SourceTypeModel } from '../../models/source-type-model';

export interface DeleteSourceTypesResponse {
    isSuccessful: boolean;
    message: string;
    sourceTypes: SourceTypeModel[];
}
