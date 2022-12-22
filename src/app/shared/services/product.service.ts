import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Product } from '../models/product';
import { Paginator } from '../models/paginator';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }
  // создание
  create(product): Observable<any> {
  
    return this.httpClient.post<any>(`${environment.api}/api/product/create`,
      JSON.stringify(product)).pipe(catchError(this.errorHandler));
  }
  // обновление
  update(productId: string, product: Product): Observable<any> {
    product.id = productId;
    return this.httpClient.post<any>(`${environment.api}/api/product/update`,
      JSON.stringify(product)).pipe(catchError(this.errorHandler));
  }
  // получить все
  getProducts(page: number, size: number, categoryId: string): Observable<Paginator<Product>> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'

    });
   let params = new HttpParams()
   .set("page",(page-1).toString())
   .set("size",size.toString());
   if(categoryId){
    params = params.set("categoryId",categoryId);
   }
    return this.httpClient.get<Paginator<Product>>(`${environment.api}/api/product/products`, { headers: headers, params: params })
      .pipe(catchError(this.errorHandler));
  }

  // удаление
  delete(id): Observable<any> {
  
    return this.httpClient.post<any>(`${environment.api}/api/product/delete`,
      { "productId": id }).pipe(catchError(this.errorHandler));
  };

  get(productId): Observable<Product> {
    let params = new HttpParams()
    .set("productId", productId);
    return this.httpClient.get<Product>(
      `${environment.api}/api/product/get`,
     { params: params })
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "ошибка сервера");
  }

}

