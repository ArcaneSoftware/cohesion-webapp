import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { QuerySourceTypesResponse } from './reponses/source-type/query-source-types-response';
import { Observable } from 'rxjs';
import { SourcesResponse } from './reponses/source/sources-response';
import { FilterSourceTypeRequest } from './requests/filter-source-type-request';
import { DeleteSourceTypesResponse } from './reponses/source-type/delete-source-types-response';

@Injectable({
    providedIn: 'root',
})
export class WebapiService {
    constructor(private http: HttpClient) {}

    getAllSourceTypes(url: string): Observable<QuerySourceTypesResponse> {
        return this.http.get<QuerySourceTypesResponse>(`${url}SourceType`);
    }

    filterSourceTypes(url: string, request: FilterSourceTypeRequest): Observable<QuerySourceTypesResponse> {
        return this.http.post<QuerySourceTypesResponse>(`${url}SourceType/Filter`, request);
    }

    deleteSourcesTypeByIds(url: string, sourceTypeIds: string[]) {
        let parameters = new HttpParams();

        sourceTypeIds.forEach((item, index) => {
            parameters = parameters.append(`array[${index}]`, item);
        });

        return this.http.delete<DeleteSourceTypesResponse>(`${url}SourceType/source-type-ids`, { params: parameters });
    }

    getSourcesBySourceTypeId(url: string, sourceTypeId: string) {
        return this.http.get<SourcesResponse>(`${url}Source/source-type-id/${sourceTypeId}`);
    }
}
