import { Injectable } from '@angular/core';
import { HttpClientService } from '../http/http-client.service';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private product_url = environment.apiurl+"manager/product";
  private user_product_url = environment.apiurl+"user/product";
  constructor(private http:HttpClientService) { }

  addProduct(productData){
		
		return <any>this.http.post(this.product_url,productData).pipe(map(data => {return data;}),catchError(this.errorHandler));
  }

  getProducts(){
    return this.http.get(this.product_url).pipe(map(data => {return data;}),catchError(this.errorHandler));
  }

  getProductDetails(prod_id){
    return this.http.get(this.user_product_url+"/"+prod_id).pipe(map(data => {return data;}),catchError(this.errorHandler));
  }

  deleteProduct(prod){
    return this.http.delete(this.user_product_url,prod).pipe(map(data => {return data;}),catchError(this.errorHandler));
  }

  getProductByName(prod_name){
    return this.http.get(environment.apiurl+'user/product_by_search/'+prod_name).pipe(map(data => {return data;}),catchError(this.errorHandler));
  }
  
  errorHandler(error){
    return throwError(error.message || "Server Error");
  }

}
