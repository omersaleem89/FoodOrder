import { Injectable, Inject } from '@angular/core';
import { Order } from '../model/order.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OrderDetail } from '../model/order-detail.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient,
              private loginService: LoginService,
              @Inject('BASE_API_URL') private baseUrl: string) { }
  list: Order[];
  order: Order;
  orderDetail: OrderDetail[];

  getOrderDetail(id){
    this.http.get(this.baseUrl + '/api/Order/GetOrderDetails/' + id)
    .toPromise()
    .then(res => this.orderDetail = res as OrderDetail[]);
  }

  refreshList() {
    if (this.loginService.user.Role === 'Admin') {
      this.http.get(this.baseUrl + '/api/Order')
        .toPromise()
        .then(res => this.list = res as Order[]);
      }
    else{
      this.http.get(this.baseUrl + '/api/Order/GetUserOrder/' + this.loginService.user.UserId)
      .toPromise()
      .then(res => this.list = res as Order[]);
    }
  }
  getOrder(id): Observable<Order> {

    return this.http.get<Order>(this.baseUrl + '/api/Order/' + id).pipe(
      tap(_ => {
        this.order = _ as Order;
      })
    );
  }
  putOrder(id: number){
    const formData = new FormData();
    formData.append('Status', `${this.order.Status}`);
    formData.append('TransId', `${this.order.TransId}`);
    formData.append('TotalPrice', this.order.TotalPrice.toString());
    formData.append('UserId', this.order.UserId.toString());
    return this.http.put(this.baseUrl + '/api/Order/' + id, formData);
  }


  updateStatus(id){
    this.getOrder(id).subscribe(
      (res) => {
        this.order.Status = true;
        this.putOrder(id).subscribe(
          () => {
           this.refreshList();
          },
            (err) => {
            console.log('Category Error!');
          });
      },
        (err) => {
        console.log('Category Error!');
      });
  }

}
