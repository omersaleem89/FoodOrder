import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient
    ,         private router: Router
    ,         @Inject('BASE_API_URL') private baseUrl: string) { }


    register(form: FormGroup) {

      const obj = {
        Email: form.get('Email').value,
        Password: form.get('Password').value,
        Role: 'Customer'
      };

      return this.http.post(this.baseUrl + '/api/Register', JSON.stringify(obj),
      {headers: new HttpHeaders({ 'content-type': 'application/json' })})
        .toPromise()
        .then(response => {
          this.router.navigate(['/login']);
        }).catch(
          response => {
            console.log(response);
          }
        );
    }

}
