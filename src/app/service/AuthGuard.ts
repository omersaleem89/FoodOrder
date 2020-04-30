import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from './login.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router,private login:LoginService) {
  }
  canActivate(route: ActivatedRouteSnapshot) {
    const user = this.login.user;
    if(user)
    {
      if (route.data.roles && route.data.roles.indexOf(user.Role) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
    }
    }
    var token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    
    this.router.navigate(['login']);
    return false;
  }
}