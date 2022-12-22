import { Injectable } from '@angular/core';
import { ISignin } from '../models/signin';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // переменная для открытия формы диалога
  // нужна для обмена данными между компонентами
  // открытия формы логина
 public shouldOpenLoginDialog$ = new Subject<boolean>();
public shouldOpenLogin(shouldOpen: boolean) {
  this.shouldOpenLoginDialog$.next(shouldOpen);
}

  // инжекция в конструктор
  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) { }
  getLoginData(loginData: string): Observable<ISignin> {
    // забираем адрес url с которого пришли на авторизацию,
    // чтобы вернуться обратно после авторизации
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      // записываем в localStorage

      if (params.returnUrl)
        localStorage.setItem('returnUrl', params.returnUrl);
      else {
        localStorage.setItem('returnUrl', '/');
      }
    });

    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.post<ISignin>(`${environment.api}/api/auth/signin`,
      loginData, { headers: headers })
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(JSON.stringify(error || "server Error"));
  }
  // для отображения имени в навбаре
  get currentUser() {
    // если есть токен
    if (localStorage.getItem('accessToken')) {
      let user = localStorage.getItem('username');
      if (!user) {

        return null;
      }
      else {

        return user;
      }
    }
  }

  get isAdmin() {
    const userRole = localStorage.getItem('role');
    if (userRole == 'ADMIN') {
      return true;
    }
    return false;
  }

  public exitLogin() {
    const shoppingCartId = localStorage.getItem('shoppingCartId');
    localStorage.clear();
    localStorage.setItem('shoppingCartId', shoppingCartId);
    // redirect to home page
    this.router.navigateByUrl('/');
  }
  public get currentUserId() {
    if (localStorage.getItem('accessToken')) {
      let userId = localStorage.getItem('userId');
      if (!userId) {

        return null;
      }
      else {

        return userId;
      }
    }
  }
}
