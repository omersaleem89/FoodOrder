import { Component, OnInit, Inject } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  constructor(public service: OrderService,
              public loginService: LoginService,
              @Inject('BASE_API_URL') public baseUrl: string ) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  updateStatus(id){
    this.service.updateStatus(id);
  }

}
