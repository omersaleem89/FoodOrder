import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../shared/login';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CurrentUser } from '../shared/currentUser';
import { Role } from '../shared/role';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  formData: Login;
  invalidLogin = false;
  user: CurrentUser = new CurrentUser();
  tempRole = '';
  constructor(private jwtHelper: JwtHelperService
    ,         private http: HttpClient
    ,         private router: Router
    ,         @Inject('BASE_API_URL') private baseUrl: string) {
  }

  login() {
    return this.http.post(this.baseUrl + '/api/Login', this.formData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .toPromise()
      .then(response => {
        const token = ( response as any).token;
        localStorage.setItem('jwt', token);
        this.invalidLogin = false;
        console.log(this.jwtHelper.decodeToken(token));
        this.user.Email = this.formData.Email;
        this.user.UserId = parseInt(this.jwtHelper.decodeToken(token)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
        this.tempRole = this.jwtHelper.decodeToken(token)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        if (this.tempRole === Role.Admin) {
          this.user.Role = Role.Admin;
          this.router.navigate(['dashboard/user']);
        }
        else {
          this.user.Role = Role.Customer;
          this.router.navigate(['user/home/category']);
        }
      }).catch(
        response => {
          console.log(response);
          this.invalidLogin = true;
        }
      );
  }
}
