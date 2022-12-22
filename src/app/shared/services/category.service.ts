import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserService } from './user.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient, private userService: UserService) { }
  getCategories(): Observable<Category[]> {
    let user = this.userService.user;

    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json; charset=utf-8',
        // 'x-access-token':user.accessToken
      }
    );
    return this.httpClient.get<Category[]>(`${environment.api}/api/category/categories`,
      { headers: headers }).pipe(catchError(this.errorHandler));
  }


  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "ошибка сервера");
  }
}
