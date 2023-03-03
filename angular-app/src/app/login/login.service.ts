import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggedIn: boolean = false;
  loginEvent = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {}

  setLoggedIn(value: boolean) {
    this.isLoggedIn = value;
    this.loginEvent.emit(value);
  }

  getLoggedIn() {
    return this.isLoggedIn;
  }

  loginUser(email: string, password: string) {
    const url = 'http://localhost:8086/users/login';
    const body = { email: email, password: password };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    const formData = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.post(url, formData.toString(), httpOptions).pipe(
      catchError((err) => {
        console.log(err);
        let errorMessage = 'An unknown error occurred.';
        if (err.status === 401) {
          errorMessage = err.error.message;
        }
        return throwError(errorMessage);
      })
    );
  }
}
