import { HttpBackend, HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, Subject, throwError } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class ImageService {

    constructor(private handler: HttpBackend) { }
    // Нужен для обмена данными при открытии файла если не найден
    public imagePicture$ = new Subject<string>();
    public changeImagePicture(fileName: string) {
      this.imagePicture$.next(fileName);
    }
    public loadPicture(fileName: string): Observable<Blob>{
      let headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      });
      let params = new HttpParams()
      .set("file", fileName);
      // без Interceptor-а
      return new HttpClient(this.handler).get(
        `${environment.api}/api/images/download`,
       { headers: headers, params: params, responseType:'blob' })
        .pipe(catchError(this.errorHandler));
    }

    public addPicture(file: File): Observable<any>{
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const accessToken = localStorage.getItem('accessToken');
        const headers = new HttpHeaders({
          'x-access-token': accessToken ?? ''
        });
        let httpClient = new HttpClient(this.handler);
        const upload$ = httpClient.post(`${environment.api}/api/images/add`,formData, {headers: headers});
        return upload$;
    }
    }


    errorHandler(error: HttpErrorResponse) {
      return throwError(error.message || "ошибка сервера");
    }
  }

function productId(arg0: string, productId: any) {
  throw new Error("Function not implemented.");
}
