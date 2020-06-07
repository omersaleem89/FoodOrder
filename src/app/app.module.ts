import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtModule } from "@auth0/angular-jwt";
import {LoginComponent} from './account/login/login.component';
import {RegisterComponent} from './account/register/register.component';
import { FormsModule }    from '@angular/forms';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './customer/home/home.component';
import { AuthGuard } from './service/AuthGuard';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './admin/user/user.component';
import { CategoryComponent } from './admin/category/category.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AllowAnonymous } from './service/AllowAnonymous';
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

  ],
  imports: [
    BrowserModule,
    FormsModule,
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
  providers: [AuthGuard,AllowAnonymous],
  bootstrap: [AppComponent]
})
export class AppModule { }
