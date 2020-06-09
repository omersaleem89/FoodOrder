import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  addButton:boolean = false;
  constructor(){ }

  ngOnInit(): void {

  }
  onActivate(componentReference) {
    componentReference.btn.subscribe((data) => {
      this.addButton=data;
   })
 }
}
