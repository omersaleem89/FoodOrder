import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../model/login';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../model/user';
import { Role } from '../model/role';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  formData: Login;
  invalidLogin: boolean = false;
  readonly rootURL = 'https://localhost:44378/api';
  user: User = new User();
  tempRole: string = "";
  constructor(private jwtHelper: JwtHelperService, private http: HttpClient, private router: Router) {
  }

  login() {
    return this.http.post(this.rootURL + '/Login', this.formData, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
      .toPromise()
      .then(response => {
        let token = (<any>response).token;
        localStorage.setItem("jwt", token);
        this.invalidLogin = false;
        console.log(this.formData);
        this.user.Email = this.formData.Email;
        this.tempRole = this.jwtHelper.decodeToken(token)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        if (this.tempRole == Role.Admin) {
          this.user.Role = Role.Admin;
          this.router.navigate(["dashboard"]);
        }
        else {
          this.user.Role = Role.Customer;
          this.router.navigate(["home"]);
        }
      }).catch(
        response => {
          console.log(response);
          this.invalidLogin = true;
        }
      );
  }
}
