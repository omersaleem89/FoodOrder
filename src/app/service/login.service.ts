import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../model/login';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  formData: Login;
  invalidLogin:boolean=false;
  readonly rootURL = 'https://localhost:44378/api';
  role:string="";
  constructor(private jwtHelper: JwtHelperService,private http: HttpClient, private router: Router) { }
  login() {
    return this.http.post(this.rootURL + '/Login',this.formData, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
    .toPromise()
    .then(response => {
      let token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.role=this.jwtHelper.decodeToken(token)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      if(this.role == "Admin")
        this.router.navigate(["dashboard"]);
      else
        this.router.navigate(["home"]);
    }).catch(
      response => {
        this.invalidLogin = true;
      }
    );
  }
}
