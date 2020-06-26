import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AppModule } from '../app.module';
import { SharedModule } from '../shared/shared/shared.module';
import { LandingComponent } from './landing/landing.component';
import { CategoryComponent } from './landing/category/category.component';
import { CategoryItemComponent } from './landing/category-item/category-item.component';
import { FoodItemComponent } from './landing/food-item/food-item.component';


@NgModule({
  declarations: [UserComponent, LandingComponent, CategoryComponent, CategoryItemComponent, FoodItemComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
