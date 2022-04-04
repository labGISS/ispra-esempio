import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Collection, CollectionMetadata, Link, Queryable} from '../Common/Model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GeoJSON} from 'geojson';

@Injectable({
  providedIn: 'root'
})
export class PygeoapiService {


  private baseUrl = 'http://localhost:5000';

  constructor(private httpClient: HttpClient) { }

  baseParams(): HttpParams {
    return new HttpParams().append('f', 'json');
  }

  getCollections(): Observable<Collection[]> {
    const url = this.baseUrl + '/collections';
    const params = this.baseParams();

    return this.httpClient.get<{ collections: Collection[]; links: Link[] }>(url, {params})
      .pipe(map((data) => {
        return data.collections;
      }));
  }

  getItems(id: string): Observable<GeoJSON> {
    const url = this.baseUrl + `/collections/${id}/items`;
    let params = this.baseParams();
    params = params.append('limit', '2000');
    console.log(params.toString());
    return this.httpClient.get<GeoJSON>(url, {params});
  }

  getCollectionMetadata(collectionId: string): Observable<CollectionMetadata> {
    const url = this.baseUrl + `/collections/${collectionId}`;
    const params = this.baseParams();
    return this.httpClient.get<CollectionMetadata>(url, {params});
  }

  getCollectionQueryables(collectionId: string): Observable<Queryable> {
    const url = this.baseUrl + `/collections/${collectionId}/queryables`;
    const params = this.baseParams();
    return this.httpClient.get<Queryable>(url, {params});
  }

  getAQDDetails(): Observable<any> {
    const url = this.baseUrl + '/collections/AQD_Campioni';
    const params = this.baseParams();
    return this.httpClient.get(url, {params});
  }
}
