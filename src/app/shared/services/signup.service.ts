import { Injectable, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient: HttpClient) { }
  signUpUser(signupData: string): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' });
    return this.httpClient.post<any>(`${environment.api}/api/auth/signup`,
      signupData, { headers: headers })
      .pipe(catchError(this.errorHandler));

  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(JSON.stringify(error) || "server Error");
  }


}
