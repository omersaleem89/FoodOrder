import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css']
})
export class FoodItemComponent implements OnInit, AfterContentChecked {
  addButton = false;
  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  onActivate(componentReference) {
    componentReference.btn.subscribe((data) => {
      this.addButton = data;
   });
 }

 ngAfterContentChecked(): void {
  this.changeDetector.detectChanges();
}
}
