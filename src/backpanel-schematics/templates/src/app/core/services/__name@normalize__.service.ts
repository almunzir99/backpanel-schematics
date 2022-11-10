import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { <%= classify(name) %> } from '../models/<%= name %>.model';
import { PagedResponse } from '../models/wrappers/paged-response.model';

@Injectable({
  providedIn: 'root'
})
export class <%= classify(normalize(name)) %>Service {

  private moduleBaseUrl = ``;
  constructor(private http: HttpClient, @Inject("BASE_API_URL") baseUrl: string) {
    this.moduleBaseUrl = `${baseUrl}api/<%= classify(normalize(name)) %>/`
   }
  get(pageIndex = 1, pageSize = 10,searchValue="",orderBy="lastUpdate",ascending = false): Observable<PagedResponse<<%= classify(name) %>[]>> {
    var params:any = {
      PageIndex:pageIndex,
      PageSize:pageSize,
      orderBy:orderBy,
      ascending:ascending,
      title:searchValue
    }
    return this.http.get(`${this.moduleBaseUrl}`,{params:params}) as Observable<PagedResponse<<%= classify(name) %>[]>>;
  }
  post(item: <%= classify(name) %>) {
    return this.http.post(`${this.moduleBaseUrl}`, item);
  }
  put(item: <%= classify(name) %>) {
    return this.http.put(`${this.moduleBaseUrl}${item.id}`, item);
  }
  delete(id: number) {
    return this.http.delete(`${this.moduleBaseUrl}${id}`);
  }
}
