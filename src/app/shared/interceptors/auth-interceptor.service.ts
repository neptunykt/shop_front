import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { };
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'x-access-token': accessToken ?? ''
    });
    const cloneReq = req.clone({ headers });

    return next.handle(cloneReq).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse)
            console.log('Server response');
        },
        error: (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401)
              console.log('Unauthorized');
          }
        }
      })
    )
  }
}