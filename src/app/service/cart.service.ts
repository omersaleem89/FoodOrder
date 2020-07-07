import { Injectable, Inject } from '@angular/core';
import { Cart } from '../model/cart.model';
import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
interface OrderDetail{
  FoodItemId?: number;
  Quantity?: number;
}

@Injectable({
  providedIn: 'root'
})


export class CartService {
  list: Cart[] = [];
  itemList: OrderDetail[] = [];
  cart: Cart = { Id: 0, Image: '', Price: 0, Quantity: 0, Name: '', TotalQuantity: 0 };
  totalQuantity = 0;
  totalPrice = 0;
  constructor(private loginService: LoginService ,
              private http: HttpClient
    ,         private router: Router
    ,         @Inject('BASE_API_URL') private baseUrl: string) {
    this.list = JSON.parse(localStorage.getItem('cart')) as Cart[];
    if (this.list) {
      this.calculateCart();
    }
    else {
      this.list = [];
    }
  }

  postOrder(){
    this.itemList = [];
    this.list.forEach(element => {
      const temp: OrderDetail = {};
      temp.FoodItemId = element.Id;
      temp.Quantity = element.Quantity;
      this.itemList.push(temp);
    });

    const obj = {
      Status: 'false',
      TransId : '0',
      TotalPrice: this.totalPrice.toString(),
      UserId : this.loginService.user.UserId.toString(),
      OrderDetails : this.itemList
    };
    return this.http.post(
                  this.baseUrl + '/api/Order/',
                  JSON.stringify(obj),
                  {headers: new HttpHeaders({ 'content-type': 'application/json' })});
  }

  addToCart(foodItem: any, quantity: number, tempCart: Cart = { Id: 0, Image: '', Price: 0, Quantity: 0, Name: '', TotalQuantity: 0 }) {

    const index = this.list.findIndex(obj => {
      return obj.Id === foodItem.Id;
    });
    if (index !== -1) {
      if (quantity === 0 || quantity === 1) {
        this.list[index].Quantity += 1;
      }
      else {
        this.list[index].Quantity += quantity;
      }
    }
    else {
      tempCart.Id = foodItem.Id,
        tempCart.Image = foodItem.Image;
      tempCart.Price = foodItem.Price;
      tempCart.Name = foodItem.Name;
      tempCart.TotalQuantity = foodItem.TotalQuantity;
      if (quantity === 0 || quantity === 1) {
        tempCart.Quantity = 1;
      }
      else {
        tempCart.Quantity = quantity;
      }
      this.list.push(tempCart);
    }
    localStorage.setItem('cart', JSON.stringify(this.list));
    this.calculateCart();
    console.log(this.list);
  }

  deleteFromCart(id) {
    const index = this.list.findIndex(obj => {
      return obj.Id === id;
    });
    if (index !== -1) {
      this.list.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(this.list));
    this.calculateCart();
  }

  updateCart(id: number, quantity: number) {
    const index = this.list.findIndex(obj => {
      return obj.Id === id;
    });
    if (index !== -1) {
      this.list[index].Quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(this.list));
      this.calculateCart();
    }
  }

  calculateCart() {
    this.totalQuantity = 0;
    this.totalPrice = 0;
    this.list.forEach(item => {
      this.totalQuantity += item.Quantity;
      this.totalPrice += (item.Quantity * item.Price);
    });

  }

  resetCart(){
    this.totalQuantity = 0;
    this.totalPrice = 0;
    localStorage.setItem('cart', '');
    this.list = [];
    this.itemList = [];
    this.cart = { Id: 0, Image: '', Price: 0, Quantity: 0, Name: '', TotalQuantity: 0 };
  }
}
