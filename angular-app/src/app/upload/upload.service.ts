import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  upload(file: File) {
    const url = 'http://localhost:5000/upload';
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(url, formData);
  }
}
