import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { AuthGuard } from '../shared/auth-guard';
import { LandingComponent } from './landing/landing.component';
import { CategoryComponent } from './landing/category/category.component';
import { CategoryItemComponent } from './landing/category-item/category-item.component';
import { FoodItemComponent } from './landing/food-item/food-item.component';

const routes: Routes = [
  { path: '', component: UserComponent , canActivate: [AuthGuard], children: [
    { path: 'home', component: LandingComponent , children: [
      { path: 'category', component: CategoryComponent },
      { path: 'categoryItem/:id', component: CategoryItemComponent },
      { path: 'foodItem/:id', component: FoodItemComponent }
    ]},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
