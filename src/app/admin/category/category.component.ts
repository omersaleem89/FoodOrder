import { Component, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit,AfterContentChecked  {

  addButton:boolean = false;
  constructor(private changeDetector:ChangeDetectorRef){ }

  ngOnInit(): void {

  }
  onActivate(componentReference) {
    componentReference.btn.subscribe((data) => {
      this.addButton=data;
   })
 }

 ngAfterContentChecked() : void {
  this.changeDetector.detectChanges();
}

}
