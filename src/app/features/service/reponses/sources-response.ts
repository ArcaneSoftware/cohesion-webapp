import { SourceModel } from '../../models/source-model';

export interface SourcesResponse {
  isSuccessful: boolean;
  message: string;
  sources: SourceModel[];
}
