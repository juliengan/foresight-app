import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private LoginService: LoginService) {}

  ngOnInit(): void {
    this.LoginService.loginEvent.subscribe((value) => {
      this.isLoggedIn = this.LoginService.getLoggedIn();
      this.isAdmin = this.LoginService.getAdmin();
      console.log(this.isAdmin)
    });
  }
}
