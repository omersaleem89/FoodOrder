import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { OrderComponent } from '../order/order.component';
import { OrderDetailComponent } from '../order/order-detail/order-detail.component';
import { ViewOrderComponent } from '../order/view-order/view-order.component';



@NgModule({
  declarations: [AdminHeaderComponent, NotFoundComponent, OrderComponent, OrderDetailComponent, ViewOrderComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AdminHeaderComponent,
    NotFoundComponent,
    OrderComponent,
    OrderDetailComponent,
    ViewOrderComponent
  ]
})
export class SharedModule { }
