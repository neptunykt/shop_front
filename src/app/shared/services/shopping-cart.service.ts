import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Product } from '../models/product';
import { throwError, Observable, map, BehaviorSubject } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import {ShoppingCartCounter} from '../models/shopping-cart-counter';
import { environment } from '../../../environments/environment';
import {BaseEntity} from '../models/base-entity';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  public shoppingCartCounter: ShoppingCartCounter = null;
  public shoppingCartId: string;
  private shareData = new BehaviorSubject(this.shoppingCartCounter);
  // текущие эти данные будут обновляться, если на них подписаться
  public currentTotalData = this.shareData.asObservable();
  // вызываем изменение в корзине - все подписанные
  // на currentData будут оповещены
  // и получат изменения
  public changeCartCounterData(shoppingCartCounter: ShoppingCartCounter) {
    this.shareData.next(shoppingCartCounter);
  }

  constructor(private httpClient: HttpClient) { }


  private createCartId(): Observable<BaseEntity> {

    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json; charset=utf-8',
      }
    );
    return this.httpClient.post<BaseEntity>(`${environment.api}/api/shopping-cart`,
      '', { headers: headers });
  }


 getShoppingCartCounter(): Observable<ShoppingCartCounter> {
  let headers = new HttpHeaders(
    {
      'Content-Type': 'application/json; charset=utf-8',
    }
  );
  let params = new HttpParams()
      .set("shoppingCartId", this.shoppingCartId);
      const response = this.httpClient.get<ShoppingCartCounter>(`${environment.api}/api/shopping-cart/cart/getShoppingCartCounter`, { headers: headers, params: params });
      return response;
 }

getShoppingCart(page:number, size: number): Observable<ShoppingCart>{
   // теперь вытаскиваем все данные из корзины
    // делаем запрос в бд - придется брать через subscribe
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json; charset=utf-8',
      }
    );
    let params = new HttpParams()
      .set("shoppingCartId", this.shoppingCartId)
      .set("page", page-1)
      .set("size", size);

    const response = this.httpClient.get<ShoppingCart>(`${environment.api}/api/shopping-cart/cart/getShoppingCart`,
     { headers: headers, params: params });
    return response;
}
removeInsertByProduct(productId: string,items: number, page: number): Observable<any>{
  let headers = new HttpHeaders(
    {
      'Content-Type': 'application/json; charset=utf-8',
    }
  );
  let params = new HttpParams()
      .set("shoppingCartId", this.shoppingCartId)
      .set("productId", productId)
      .set("items",items);
      const response = this.httpClient.get<any>(`${environment.api}/api/shopping-cart/cart/removeInsertByProduct`, { headers: headers, params: params });
      return response;
}

  public getOrCreateShoppingCartId(): Observable<string> {
    let shoppingCartId = localStorage.getItem('shoppingCartId');
    if (shoppingCartId) {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'

      });
      let params = new HttpParams()
        .set("shoppingCartId", shoppingCartId);
      // тут проверяем - соответствует ли карточке на беке
      let res= this.httpClient.get(`${environment.api}/api/shopping-cart/cart/getOrCreateShoppingCartId`,
        { headers: headers, params: params }).pipe(map(
          res => {
            this.shoppingCartId = res["id"];
            localStorage.setItem('shoppingCartId', res["id"])
            return res["id"];
          })
        );
          return res;
    } else {
     let res = this.createCartId().pipe(map(
        p => {
          this.shoppingCartId = p.id;
          localStorage.setItem('shoppingCartId', p.id.toString())
          return p.id;
        }
      ));
      return res;
    }
  }


   addOneToCart(product: Product): Observable<ShoppingCartCounter> {
    let item$ = this.createDeleteItem(this.shoppingCartId, product.id, true);
    return item$;
  }

  removeOneFromCart(product: Product): Observable<ShoppingCartCounter> {
    return this.createDeleteItem(this.shoppingCartId, product.id, false);
  }

  public clearShoppingCart(): Observable<any> {

    // отсылаем на очистку корзины
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    }
    );

    const response = this.httpClient.delete(`${environment.api}/api/shopping-cart/clearShoppingCart`,
       { headers: headers, body:{
       "shoppingCartId": this.shoppingCartId
       } });

    return response;

  }

 get(): Observable<ShoppingCart> {
  let headers = new HttpHeaders(
    {
      'Content-Type': 'application/json; charset=utf-8',
    }
  );
  let params = new HttpParams()
    .set("shoppingCartId", this.shoppingCartId);


  const response = this.httpClient.get<ShoppingCart>(`${environment.api}/api/shopping-cart/cart`,
   { headers: headers, params: params });
  return response;
 }

  private createDeleteItem(shoppingCartId: string, productId: string, isAdd: boolean): Observable<ShoppingCartCounter> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    }
    );
    if (isAdd) {
      const response = this.httpClient.post<ShoppingCartCounter>(`${environment.api}/api/shopping-cart/addOne`,
        { "shoppingCartId": shoppingCartId, "productId": productId }, { headers: headers })
        return response;
    }
    else {
      const response = this.httpClient.post<ShoppingCartCounter>(`${environment.api}/api/shopping-cart/removeOne`,
        { "shoppingCartId": shoppingCartId, "productId": productId }, { headers: headers })
     return response;
    }
  }





  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "ошибка сервера");
  }

}
