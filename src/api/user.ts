import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable()
export class UserAPI {

  constructor(public http: HttpClient) {}

  create(params) {
    return this.http.post(`${environment.api_endpoint}/users`, params);
  }
}
