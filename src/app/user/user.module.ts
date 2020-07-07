import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SharedModule } from '../shared/shared/shared.module';
import { LandingComponent } from './landing/landing.component';
import { CategoryComponent } from './landing/category/category.component';
import { CategoryItemComponent } from './landing/category-item/category-item.component';
import { FoodItemComponent } from './landing/food-item/food-item.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './landing/cart/cart.component';
import { RouterModule } from '@angular/router';
import { MyOrderComponent } from './landing/my-order/my-order.component';



@NgModule({
  declarations: [
    UserComponent,
    LandingComponent,
    CategoryComponent,
    CategoryItemComponent,
    FoodItemComponent,
    CartComponent,
    MyOrderComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    FormsModule,
    RouterModule
  ]
})
export class UserModule { }
