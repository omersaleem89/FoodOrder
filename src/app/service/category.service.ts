import { Injectable, Inject, ChangeDetectorRef } from '@angular/core';
import { Category } from '../model/category.model';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  list : Category[];
  category: Category = new Category();
  constructor(private http: HttpClient,@Inject('BASE_API_URL') private baseUrl: string) {
   }
  
  getCategory(id){
    this.http.get(this.baseUrl + '/api/Category/'+id)
    .toPromise()
    .then(res => {
      this.category = res as Category;
    });
  }
  
   postCategory(categoryForm:FormGroup){
    const formData = new FormData();
    formData.append('Name', categoryForm.get('name').value);
    formData.append('ImageFile', categoryForm.get('FileUpload').value);
    formData.append('ImageFileThumb', categoryForm.get('FileUpload').value);

     return this.http.post(this.baseUrl + '/api/Category', formData);
   }

   putCategory(categoryForm:FormGroup, id:number){
    const formData = new FormData();
    formData.append('Id', id.toString());
    formData.append('Name', categoryForm.get('name').value);
    formData.append('ImageFile', categoryForm.get('FileUpload').value);
    formData.append('ImageFileThumb', categoryForm.get('FileUpload').value);

     return this.http.put(this.baseUrl + '/api/Category', formData);
   }

   deleteCategory(id:number){
    return this.http.delete(this.baseUrl + '/api/Category/'+id);
   }


  refreshList(){
    this.http.get(this.baseUrl + '/api/Category')
    .toPromise()
    .then(res => this.list = res as Category[]);
}
}
