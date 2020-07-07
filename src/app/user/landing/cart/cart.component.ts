import { Component, OnInit, Inject } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public service: CartService,
              @Inject('BASE_API_URL') public baseUrl: string) { }

  ngOnInit(): void {
  }

  deleteFromCart(id){
    this.service.deleteFromCart(id);
  }

  updateCart(id, quantity){
    this.service.updateCart(id, quantity);
  }

  postOrder(){
    this.service.postOrder().subscribe(
      (res) => {
        this.service.resetCart();
      },
      (err) => {
        console.log(err);
      });
  }

}
