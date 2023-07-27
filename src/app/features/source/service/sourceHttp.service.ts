import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SourceTypesResponse } from './reponses/source-types-response';
import { Observable } from 'rxjs';
import { SourcesResponse } from './reponses/sources-response';

@Injectable({
  providedIn: 'root',
})
export class SourceHttpService {
  constructor(private http: HttpClient) {}

  getAllSourceTypes(url: string): Observable<SourceTypesResponse> {
    return this.http.get<SourceTypesResponse>(`${url}SourceType`);
  }

  getSourcesBySourceTypeId(url: string, sourceTypeId: number | null) {
    return this.http.get<SourcesResponse>(`${url}Source/SourceType/${sourceTypeId}`);
  }
}
