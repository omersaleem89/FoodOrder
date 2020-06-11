import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FoodItemService } from 'src/app/service/food-item.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-add-food-item',
  templateUrl: './add-food-item.component.html',
  styleUrls: ['./add-food-item.component.css']
})
export class AddFoodItemComponent implements OnInit {
  constructor(public serviceCategory: CategoryService, public service: FoodItemService, private router: Router) { }
  status = 'init';
  @Output() btn: EventEmitter<any> = new EventEmitter();

  foodItemForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    ImageFile:  new FormControl('', [Validators.required]),
    Description:  new FormControl('', [Validators.required]),
    Price:  new FormControl('', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')], ),
    Quantity:  new FormControl('', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]),
    CategoryId:  new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.setAddButton(false);
    this.serviceCategory.refreshList();
  }

  setAddButton(data) {
    // emit data to parent component
    this.btn.emit(data);
  }

  onSubmit(){
    this.service.postFoodItem(this.foodItemForm).subscribe(
      (res) => {
        this.onSuccess();
      },
      (err) => {
        this.onError();
      });
  }

  private onSuccess() {
    this.status = 'ok';
    this.router.navigate(['/dashboard/foodItem/viewFoodItem']);
  }

  private onError() {
    this.status = 'fail';
  }
  processFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.foodItemForm.patchValue({
        ImageFile: file
      });
    }
  }
}
