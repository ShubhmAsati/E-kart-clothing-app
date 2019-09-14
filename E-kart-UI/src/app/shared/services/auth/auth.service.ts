import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
export const TOKEN_NAME: string = '__a_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	private apiurl="";
  	constructor(private http:HttpClient,private router: Router,) {
  		
  	}

	login(user){
		var login_url = this.apiurl+"login_admin";
		return this.http.post<any>(login_url,user);
	}
	isLoggednIn(){
		return this.getToken() !== null;
	} 
	setToken(token: string): void {
	    sessionStorage.setItem(TOKEN_NAME, token);
	} 
	getToken(){
		return sessionStorage.getItem(TOKEN_NAME);
	}
	logoutAdmin(){
		sessionStorage.removeItem(TOKEN_NAME);
		this.router.navigate(['/login']);
	}	
}
