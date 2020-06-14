import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './account/login/login.component';
import {RegisterComponent} from './account/register/register.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './customer/home/home.component';
import { AuthGuard } from './shared/auth-guard';
import { Role } from './shared/role';
import { UserComponent } from './admin/user/user.component';
import { CategoryComponent } from './admin/category/category.component';
import { AllowAnonymous } from './shared/allow-anonymous';
import { ViewCategoryComponent } from './admin/category/view-category/view-category.component';
import { EditCategoryComponent } from './admin/category/edit-category/edit-category.component';
import { AddCategoryComponent } from './admin/category/add-category/add-category.component';
import { DeleteCategoryComponent } from './admin/category/delete-category/delete-category.component';
import { FoodItemComponent } from './admin/food-item/food-item.component';
import { ViewFoodItemComponent } from './admin/food-item/view-food-item/view-food-item.component';
import { AddFoodItemComponent } from './admin/food-item/add-food-item/add-food-item.component';
import { EditFoodItemComponent } from './admin/food-item/edit-food-item/edit-food-item.component';
import { DeleteFoodItemComponent } from './admin/food-item/delete-food-item/delete-food-item.component';
import { OrderComponent } from './admin/order/order.component';
import { OrderDetailComponent } from './admin/order/order-detail/order-detail.component';
import { ViewOrderComponent } from './admin/order/view-order/view-order.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AllowAnonymous] },
  { path: 'register', component: RegisterComponent, canActivate: [AllowAnonymous] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data : {roles : [Role.Admin]}, children: [
    { path: 'user', component: UserComponent },
    { path: 'category', component: CategoryComponent, children: [
      { path: 'viewCategory', component: ViewCategoryComponent },
      { path: 'addCategory', component: AddCategoryComponent },
      { path: 'editCategory/:id', component: EditCategoryComponent },
      { path: 'deleteCategory/:id', component: DeleteCategoryComponent }
    ] },
    { path: 'foodItem', component: FoodItemComponent, children: [
      { path: 'viewFoodItem', component: ViewFoodItemComponent },
      { path: 'addFoodItem', component: AddFoodItemComponent },
      { path: 'editFoodItem/:id', component: EditFoodItemComponent },
      { path: 'deleteFoodItem/:id', component: DeleteFoodItemComponent }
    ] },
    { path: 'order', component: OrderComponent, children: [
      { path: 'viewOrder', component: ViewOrderComponent },
      { path: 'orderDetail/:id', component: OrderDetailComponent }
    ] }
  ] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
