import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodItemService } from 'src/app/service/food-item.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css']
})
export class FoodItemComponent implements OnInit {
  id: number;
  itemQuantity = 1;
  constructor(private route: ActivatedRoute,
              public service: FoodItemService,
              private cartService: CartService,
              @Inject('BASE_API_URL') public baseUrl: string) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.service.getFoodItem(this.id).subscribe(
      () => {
      });
  }

  addToCart() {
    this.cartService.addToCart(this.service.foodItem, this.itemQuantity);
  }
}
