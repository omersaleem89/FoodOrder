import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { FoodItemService } from 'src/app/service/food-item.service';

@Component({
  selector: 'app-delete-food-item',
  templateUrl: './delete-food-item.component.html',
  styleUrls: ['./delete-food-item.component.css']
})
export class DeleteFoodItemComponent implements OnInit {
  id: number;
  @Output() btn: EventEmitter<any> = new EventEmitter();
  constructor(private route: ActivatedRoute,public service: FoodItemService, private router:Router) { }


  ngOnInit(): void {
    this.setAddButton(false);
    this.getFoodItem();
  }
  setAddButton(data) {
    // emit data to parent component
    this.btn.emit(data);
  }

  getFoodItem(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.service.getFoodItem(this.id);
  }

  deleteFoodItem(){
    this.service.deleteFoodItem(this.id).subscribe(
      (res) => {
        this.service.refreshList();
        this.router.navigate(['/dashboard/foodItem/viewFoodItem']);
      },
      (err) => {

      });
  }

}
