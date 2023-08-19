import { SourceModel } from '../../../models/source/source-model';

export interface SourcesResponse {
    isSuccessful: boolean;
    message: string;
    sources: SourceModel[];
}
