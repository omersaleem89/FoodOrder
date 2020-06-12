import { Injectable, Inject } from '@angular/core';
import { Order } from '../model/order.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient, @Inject('BASE_API_URL') private baseUrl: string) { }
  list: Order[];
  order: Order;
  refreshList() {
    this.http.get(this.baseUrl + '/api/Order')
      .toPromise()
      .then(res => this.list = res as Order[]);
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
    formData.append('Status', this.order.Status + '');
    formData.append('TotalPrice', this.order.TotalPrice.toString());
    formData.append('UserId', this.order.UserId.toString());
    return this.http.put(this.baseUrl + '/api/Order/' + id, formData);
  }

  updateStatus(id){
    this.getOrder(id).subscribe(
      (res) => {
        this.order.Status = true;
        this.putOrder(id).subscribe(
          (res) => {
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
