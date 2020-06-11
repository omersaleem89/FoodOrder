import { Injectable, Inject } from '@angular/core';
import { FoodItem } from '../model/food-item.model';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FoodItemService {
  list : FoodItem[];
  foodItem: FoodItem = new FoodItem();
  constructor(private http: HttpClient,@Inject('BASE_API_URL') private baseUrl: string) { }
  
  getFoodItem(id){
    this.http.get(this.baseUrl + '/api/FoodItem/Get/'+id)
    .toPromise()
    .then(res => {
      this.foodItem = res as FoodItem;
    });
  }

  refreshList(){
    this.http.get(this.baseUrl + '/api/FoodItem')
    .toPromise()
    .then(res => this.list = res as FoodItem[]);
}

postFoodItem(foodItemForm:FormGroup){
  const formData = new FormData();
  formData.append('Name', foodItemForm.get('Name').value);
  formData.append('Image', foodItemForm.get('ImageFile').value);
  formData.append('ImageThumb', foodItemForm.get('ImageFile').value);
  formData.append('Description', foodItemForm.get('Description').value);
  formData.append('Price', foodItemForm.get('Price').value);
  formData.append('Quantity', foodItemForm.get('Quantity').value);
  formData.append('IsEnabled', "true");
  formData.append('IsDeleted', "false");
  formData.append('CategoryId', foodItemForm.get('CategoryId').value);
   return this.http.post(this.baseUrl + '/api/FoodItem', formData);
 }

 deleteFoodItem(id:number){
  return this.http.delete(this.baseUrl + '/api/FoodItem/'+id);
 }

}
