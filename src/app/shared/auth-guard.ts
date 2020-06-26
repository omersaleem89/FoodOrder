import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from '../service/login.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router, private login: LoginService) {
  }
  canActivate(route: ActivatedRouteSnapshot) {
    const user = this.login.user;
    if (user.Email.length !== 0)
    {
      if (route.data.roles && route.data.roles.indexOf(user.Role) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
    }
    }
    const token = localStorage.getItem('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token)){
      this.login.user.Role = this.jwtHelper.decodeToken(token)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      this.login.user.Email = this.jwtHelper.decodeToken(token)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
