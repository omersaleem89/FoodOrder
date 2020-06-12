import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
import { FoodItemService } from 'src/app/service/food-item.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-food-item',
  templateUrl: './edit-food-item.component.html',
  styleUrls: ['./edit-food-item.component.css']
})
export class EditFoodItemComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              public serviceCategory: CategoryService,
              public service: FoodItemService,
              private router: Router,
              @Inject('BASE_API_URL') public baseUrl: string) { }
  status = 'init';
  @Output() btn: EventEmitter<any> = new EventEmitter();
  id: number;

  foodItemForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    ImageFile:  new FormControl('', null),
    Description:  new FormControl('', [Validators.required]),
    Price:  new FormControl('', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')], ),
    Quantity:  new FormControl('', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]),
    CategoryId:  new FormControl('', [Validators.required]),
    IsEnabled : new FormControl('', null)
  });
  ngOnInit(): void {
    this.setAddButton(false);
    this.serviceCategory.refreshList();
    this.getFoodItem();
  }

  getFoodItem(){
    this.id = +this.route.snapshot.paramMap.get('id');
    this.service.getFoodItem(this.id).subscribe(
      (res) => {
        this.foodItemForm.get('CategoryId').setValue(res.CategoryId);
        this.foodItemForm.get('Description').setValue(res.Description);
        this.foodItemForm.get('Price').setValue(res.Price);
        this.foodItemForm.get('Name').setValue(res.Name);
        this.foodItemForm.get('Quantity').setValue(res.Quantity);
        this.foodItemForm.get('IsEnabled').setValue(res.IsEnabled);
      },
      (err) => {
        console.log('Food Item Error!');
      });
  }

  setAddButton(data) {
    // emit data to parent component
    this.btn.emit(data);
  }

  onSubmit(){
    this.service.putFoodItem(this.foodItemForm, this.id).subscribe(
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
