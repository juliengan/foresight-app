import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../app/login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private LoginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (this.LoginService.getLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

// @Injectable({
//   providedIn: 'root',
// })
// export class AdminGuard implements CanActivate {
//   constructor(private loginService: LoginService, private router: Router) {}

//   canActivate(): boolean {
//     let isAdmin = false;
//     if (this.loginService.isLoggedIn) {
//       this.loginService.adminUser().subscribe((res) => (isAdmin = res.admin));
//       if (isAdmin) {
//         return true;
//       } else {
//         this.router.navigate(['/board']);
//         return false;
//       }
//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
// }
