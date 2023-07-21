import { SourceModel } from 'src/app/features/models/source-model';

export interface SourcesResponse {
  isSuccessful: boolean;
  message: string;
  sources: SourceModel[];
}
