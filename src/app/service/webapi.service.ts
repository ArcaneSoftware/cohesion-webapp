import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SourceTypesResponse } from './reponses/source-types-response';
import { Observable } from 'rxjs';
import { SourcesResponse } from './reponses/sources-response';
import { FilterSourceTypeRequest } from './requests/filter-source-type-request';

@Injectable({
    providedIn: 'root',
})
export class WebapiService {
    constructor(private http: HttpClient) {}

    getAllSourceTypes(url: string): Observable<SourceTypesResponse> {
        return this.http.get<SourceTypesResponse>(`${url}SourceType`);
    }

    filterSourceTypes(url: string, request: FilterSourceTypeRequest): Observable<SourceTypesResponse> {
        return this.http.post<SourceTypesResponse>(`${url}SourceType/Filter`, request);
    }

    getSourcesBySourceTypeId(url: string, sourceTypeId: string | null) {
        return this.http.get<SourcesResponse>(`${url}Source/source-type-id/${sourceTypeId}`);
    }
}
