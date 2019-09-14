import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class HttpClientService {

  constructor(private http: HttpClient,private _auth:AuthService) {}

  createAuthorizationHeader(headers: HttpHeaders) {
    return headers.append('Authorization', `Bearer ${this._auth.getToken()}`); 
  }

  get(url) {
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    return this.http.get<any>(url, { headers: headers });
  }

  post(url, data) {
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    return this.http.post<any>(url, data ,{ headers: headers });
  }

  put(url, data) {
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    return this.http.put<any>(url, data ,{ headers: headers });
  }

  delete(url,data?) {
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    if(data){
      return this.http.delete<any>(url,{ headers: headers, observe: data });
    } else {
    return this.http.delete<any>(url,{ headers: headers });
    }
  }

}
