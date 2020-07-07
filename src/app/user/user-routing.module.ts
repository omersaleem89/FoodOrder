import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { AuthGuard } from '../shared/auth-guard';
import { LandingComponent } from './landing/landing.component';
import { CategoryComponent } from './landing/category/category.component';
import { CategoryItemComponent } from './landing/category-item/category-item.component';
import { FoodItemComponent } from './landing/food-item/food-item.component';
import { CartComponent } from './landing/cart/cart.component';
import { OrderComponent } from '../shared/order/order.component';
import { ViewOrderComponent } from '../shared/order/view-order/view-order.component';
import { OrderDetailComponent } from '../shared/order/order-detail/order-detail.component';

const routes: Routes = [
  { path: '', component: UserComponent , canActivate: [AuthGuard], children: [
    { path: 'home', component: LandingComponent , children: [
      { path: 'category', component: CategoryComponent },
      { path: 'categoryItem/:id', component: CategoryItemComponent },
      { path: 'foodItem/:id', component: FoodItemComponent },
      { path: 'cart', component: CartComponent },
      { path: 'order', component: OrderComponent, children: [
      { path: 'viewOrder', component: ViewOrderComponent },
      { path: 'orderDetail/:id', component: OrderDetailComponent }
    ] }
    ]},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
