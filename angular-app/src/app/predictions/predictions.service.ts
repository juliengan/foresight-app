import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PredictionsService {
  constructor(private http: HttpClient) {}

  getData(table_name: string): Observable<any> {
    const url = `http://127.0.0.1:5000/get_predictions/${table_name}`;
    return this.http.get<any>(url);
  }
}
