import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtModule } from "@auth0/angular-jwt";
import {LoginComponent} from './account/login/login.component';
import {RegisterComponent} from './account/register/register.component';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './customer/home/home.component';
import { AuthGuard } from './service/AuthGuard';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './admin/user/user.component';
import { CategoryComponent } from './admin/category/category.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AllowAnonymous } from './service/AllowAnonymous';
import { environment } from 'src/environments/environment';
import { ViewCategoryComponent } from './admin/category/view-category/view-category.component';
import { EditCategoryComponent } from './admin/category/edit-category/edit-category.component';
import { AddCategoryComponent } from './admin/category/add-category/add-category.component';
import { DeleteCategoryComponent } from './admin/category/delete-category/delete-category.component';
import { FoodItemComponent } from './admin/food-item/food-item.component';
import { ViewFoodItemComponent } from './admin/food-item/view-food-item/view-food-item.component';
import { EditFoodItemComponent } from './admin/food-item/edit-food-item/edit-food-item.component';
import { DeleteFoodItemComponent } from './admin/food-item/delete-food-item/delete-food-item.component';
import { AddFoodItemComponent } from './admin/food-item/add-food-item/add-food-item.component';
import { OrderComponent } from './admin/order/order.component';
export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    UserComponent,
    CategoryComponent,
    AdminHeaderComponent,
    ViewCategoryComponent,
    EditCategoryComponent,
    AddCategoryComponent,
    DeleteCategoryComponent,
    FoodItemComponent,
    ViewFoodItemComponent,
    EditFoodItemComponent,
    DeleteFoodItemComponent,
    AddFoodItemComponent,
    OrderComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:44378"],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [AuthGuard,AllowAnonymous,{ provide: "BASE_API_URL", useValue: environment.apiUrl }],
  bootstrap: [AppComponent]
})
export class AppModule { }
