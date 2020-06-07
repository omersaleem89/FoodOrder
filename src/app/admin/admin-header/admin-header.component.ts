import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private router:Router,public service:LoginService) { }

  ngOnInit(): void {
  }
  signOut() : void {
    localStorage.setItem("jwt", "");
    this.router.navigate(['login']);
  }
}
