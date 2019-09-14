import { Injectable } from '@angular/core';
import { HttpClientService } from '../http/http-client.service';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClientService) { }

  register(user){
		var signup_url = environment.apiurl+"login_signup/signup";
		return this.http.post(signup_url,user).pipe(map(data => {return data;}),catchError(this.errorHandler));
  }
  
  errorHandler(error){
    return throwError(error.message || "Server Error");
  }

}
