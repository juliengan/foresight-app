import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  loginError: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private LoginService: LoginService
  ) {}

  ngOnInit() {
    document.body.classList.add('bg');
  }

  onSubmit() {
    this.LoginService.loginUser(this.email, this.password).subscribe(
      (res: any) => {
        console.log(res);
        if (res.success) {
          this.LoginService.setLoggedIn(true, this.email);
          this.LoginService.getUserLevel().subscribe((res: any) => {
            console.log(res.level);
            if (res.level == 0) {
              this.LoginService.isAdmin == true;
            }
            this.router.navigate(['/board']);
          });
        }
      },
      (error) => {
        this.loginError = error;
        console.error(error);
      }
    );
  }

  ngOnDestroy() {
    document.body.className = '';
  }
}
