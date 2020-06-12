import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Role } from './role';
import { LoginService } from '../service/login.service';
@Injectable()
export class AllowAnonymous implements CanActivate {
  Role: any;
  constructor(private jwtHelper: JwtHelperService, private router: Router, private service: LoginService) {
  }
  canActivate(route: ActivatedRouteSnapshot) {
    const token = localStorage.getItem('jwt');
    if (token && token !== '' && !this.jwtHelper.isTokenExpired(token))
    {
      this.Role = this.jwtHelper.decodeToken(token)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      this.service.user.Role = this.Role;
      this.service.user.Email = this.jwtHelper.decodeToken(token)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
      if (this.Role === Role.Admin) {
        this.router.navigate(['dashboard/user']);
        return false;
      }
      else {
        this.router.navigate(['home']);
        return false;
      }
    }
    return true;
  }
}
