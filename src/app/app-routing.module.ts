import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './account/login/login.component';
import {RegisterComponent} from './account/register/register.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './customer/home/home.component';
import { AuthGuard } from './service/AuthGuard';
import { Role } from './model/role';
import { UserComponent } from './admin/user/user.component';
import { CategoryComponent } from './admin/category/category.component';
import { AllowAnonymous } from './service/AllowAnonymous';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent,canActivate:[AllowAnonymous] },
  { path: 'register', component: RegisterComponent,canActivate:[AllowAnonymous] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],data : {roles : [Role.Admin]}, children: [
    { path: 'user', component: UserComponent },
    { path: 'category', component: CategoryComponent },
  ] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
