import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public service:LoginService) {
   }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      Email: '',
      Password: ''
    }
  }  
  onSubmit(form: NgForm) {

    this.service.login();
  }
  
}
