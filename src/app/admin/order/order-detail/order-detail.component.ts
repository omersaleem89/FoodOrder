import { Component, OnInit, Inject } from '@angular/core';
import { OrderDetail } from 'src/app/model/order-detail.model';
import { OrderService } from 'src/app/service/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(public service: OrderService,
              @Inject('BASE_API_URL') public baseUrl: string,
              private route: ActivatedRoute ) { }

  ngOnInit(): void {
   const id = +this.route.snapshot.paramMap.get('id');
   this.service.getOrderDetail(id);
  }

}
