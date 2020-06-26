import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { NotFoundComponent } from '../not-found/not-found.component';



@NgModule({
  declarations: [AdminHeaderComponent, NotFoundComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AdminHeaderComponent,
    NotFoundComponent
  ]
})
export class SharedModule { }
