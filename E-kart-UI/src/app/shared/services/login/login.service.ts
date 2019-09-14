import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(user){
		var login_url = environment.apiurl+"login_signup/login";
		return this.http.post<any>(login_url,user).pipe(map(data => {return data;}),catchError(this.errorHandler));
  }
  
  errorHandler(error){
    return throwError(error.message || "Server Error");
  }
}
