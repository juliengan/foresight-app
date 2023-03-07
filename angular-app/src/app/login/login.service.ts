import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  levelUser: number = -1;
  emailUser: string = '';
  loginEvent = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {}

  setLoggedIn(value: boolean, email: string) {
    console.log(value, email);
    this.isLoggedIn = value;
    this.emailUser = email;
    localStorage.setItem('email', email);
    this.getUserLevel().subscribe((res: any) => {
      this.levelUser = res.level;
      if (this.levelUser == 0) {
        this.isAdmin = true;
      }
      this.loginEvent.emit(value);
    });
  }

  getLoggedIn() {
    return this.isLoggedIn;
  }

  getUser() {
    return this.emailUser;
  }

  getAdmin() {
    return this.isAdmin;
  }

  getUserLevel(): Observable<any> {
    const email = this.emailUser;
    console.log(email);
    const url = `http://localhost:8086/users/level?email=${email}`;
    return this.http.get(url);
  }

  adminUser(): Observable<any> {
    let level = 1;
    console.log(this.isLoggedIn);
    return this.getUserLevel().pipe(
      switchMap((data) => {
        const level = data.level;
        const url = `http://localhost:8086/users/administrator?level=${level}`;
        return this.http.get(url).pipe(
          tap(() => {
            this.isAdmin = true;
          })
        );
      })
    );
  }

  register(name: string, email: string, password: string, password2: string) {
    const url = 'http://localhost:8086/users/register';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    
    const formData = new HttpParams()
      .set('name', name)
      .set('email', email)
      .set('password', password)
      .set('password2', password2);

    console.log(formData);
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
      tap(() => {
        this.emailUser = email;
        this.isLoggedIn = true;
      }),
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
