import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public users: any;
  public username: string = '';
  public email: string = '';
  public password: string = '';
  public password2: string = '';

  constructor(private LoginService: LoginService) {}
  ngOnInit(): void {
    this.LoginService.adminUser().subscribe((res) => {
      this.users = res.users;
      console.log(res);
    });
  }

  onSubmit() {
    console.log('onSubmit');
    this.LoginService.register(
      this.username,
      this.email,
      this.password,
      this.password2
    ).subscribe((res) => {
      console.log(res);
      this.LoginService.adminUser().subscribe((res) => {
        this.users = res.users;
        console.log(res);
      });
    });
  }
}
