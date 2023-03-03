import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient) {}

  getData(table_name: string): Observable<any> {
    const url = `http://127.0.0.1:5000/get_data/${table_name}`;
    return this.http.get<any>(url);
  }

  getTables(): Observable<string[]> {
    const url = 'http://localhost:5000/get_tables';
    const body = {};

    return this.http.get<string[]>(url, body);
  }

  filter(table_name : string, columns : string[]): Observable<any> {
    const url = 'http://localhost:5000/filter_features';
    const body = { table_name: table_name, columns: columns };
    return this.http.post(url, body);
  }

  trainAndPredict(train_table_name: string): Observable<any> {
    const url = 'http://localhost:5000/train_and_predict';
    const body = { train_table_name: train_table_name };
    return this.http.post(url, body);
  }
}
