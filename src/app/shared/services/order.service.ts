import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { ShoppingCartService } from './shopping-cart.service';
import { environment } from '../../../environments/environment';
import { ShoppingCartCounter } from '../models/shopping-cart-counter';
import { Paginator } from '../models/paginator';
import { Shipping } from '../models/shipping';
import { OrderItem } from '../models/order-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient, private shoppingCartService: ShoppingCartService) { }
  public placeOrder(order): Observable<any> {

    const response = this.httpClient.post<any>(`${environment.api}/api/shipping/save`,
      JSON.stringify(order));
    let shoppingCartCounter = new ShoppingCartCounter(0,0);
    // тут сразу сделаем изменение корзины для подписчиков
    this.shoppingCartService.changeCartCounterData(shoppingCartCounter);

    return response;
  }


  getAllForUser(idUser): Observable<[]> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',

    });


    return this.httpClient.post<[]>(`${environment.api}/api/shippings/orders`, { "idUser": idUser }, { headers: headers })
      .pipe(catchError(this.errorHandler));
  }

  getOrdersByUser(page: number, size: number, userId: string): Observable<Paginator<Shipping>> {

    let params = new HttpParams()
      .set("page", (page - 1).toString())
      .set("size", size.toString())
      .set('userId', userId);
    return this.httpClient.get<Paginator<Shipping>>(`${environment.api}/api/orders/getOrdersByUser`, { params: params })
      .pipe(catchError(this.errorHandler));
  }

  getOrdersByAdmin(page: number, size: number): Observable<Paginator<Shipping>> {
    let params = new HttpParams()
      .set("page", (page - 1).toString())
      .set("size", size.toString());
    return this.httpClient.get<Paginator<Shipping>>(`${environment.api}/api/orders/admin/getOrders`, { params: params })
      .pipe(catchError(this.errorHandler));
  }

  get(shippingId: string): Observable<OrderItem[]> {
    let params = new HttpParams()
      .set("shippingId", shippingId);
    return this.httpClient.get<OrderItem[]>(`${environment.api}/api/shipping/`, { params: params })
      .pipe(catchError(this.errorHandler));
  };
  // удаление одного заказа
  delete(shippingId: string): Observable<any> {
    let params = new HttpParams()
      .set("shippingId", shippingId);
    return this.httpClient.delete<any>(`${environment.api}/api/shipping/`, { params: params })
      .pipe(catchError(this.errorHandler));
  };


  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "ошибка сервера");
  }
}


