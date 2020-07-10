import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { CartService } from 'src/app/service/cart.service';
import { SignalRService } from 'src/app/service/signal-r.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private router: Router,
              public service: LoginService,
              public cartService: CartService,
              public signalRService: SignalRService) { }

  ngOnInit(): void {
  }

  viewNotifications(){
    this.signalRService.message = '';
    this.router.navigate(['dashboard/order/viewOrder']);
  }

  signOut(): void {
    localStorage.setItem('jwt', '');
    this.router.navigate(['login']);
  }
}
