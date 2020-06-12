import { Injectable, Inject } from '@angular/core';
import { FoodItem } from '../model/food-item.model';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodItemService {
  list: FoodItem[];
  foodItem: FoodItem;
  constructor(private http: HttpClient, @Inject('BASE_API_URL') private baseUrl: string) { }

  getFoodItem(id): Observable<FoodItem> {

    return this.http.get<FoodItem>(this.baseUrl + '/api/FoodItem/Get/' + id).pipe(
      tap(_ => {
        this.foodItem = _ as FoodItem;
      })
    );
  }

  refreshList() {
    this.http.get(this.baseUrl + '/api/FoodItem')
      .toPromise()
      .then(res => this.list = res as FoodItem[]);
  }

  postFoodItem(foodItemForm: FormGroup) {
    const formData = new FormData();
    formData.append('Name', foodItemForm.get('Name').value);
    formData.append('Image', foodItemForm.get('ImageFile').value);
    formData.append('ImageThumb', foodItemForm.get('ImageFile').value);
    formData.append('Description', foodItemForm.get('Description').value);
    formData.append('Price', foodItemForm.get('Price').value);
    formData.append('Quantity', foodItemForm.get('Quantity').value);
    formData.append('IsEnabled', 'true');
    formData.append('IsDeleted', 'false');
    formData.append('CategoryId', foodItemForm.get('CategoryId').value);
    return this.http.post(this.baseUrl + '/api/FoodItem', formData);
  }

  putFoodItem(foodItemForm: FormGroup, id: number) {
    const formData = new FormData();
    formData.append('Name', foodItemForm.get('Name').value);
    formData.append('Image', foodItemForm.get('ImageFile').value);
    formData.append('ImageThumb', foodItemForm.get('ImageFile').value);
    formData.append('Description', foodItemForm.get('Description').value);
    formData.append('Price', foodItemForm.get('Price').value);
    formData.append('Quantity', foodItemForm.get('Quantity').value);
    formData.append('IsEnabled', foodItemForm.get('IsEnabled').value);
    formData.append('IsDeleted', 'false');
    formData.append('CategoryId', foodItemForm.get('CategoryId').value);
    return this.http.put(this.baseUrl + '/api/FoodItem/' + id, formData);
  }

  deleteFoodItem(id: number) {
    return this.http.delete(this.baseUrl + '/api/FoodItem/' + id);
  }

}
