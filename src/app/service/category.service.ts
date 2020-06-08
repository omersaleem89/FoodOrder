import { Injectable, Inject } from '@angular/core';
import { Category } from '../model/category.model';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  list : Category[];
  category: Category;
  //formData : FormGroup;
  constructor(private http: HttpClient,@Inject('BASE_API_URL') private baseUrl: string) { }
  
  getCategory(id){
    this.http.get(this.baseUrl + '/api/Category/'+id)
    .toPromise()
    .then(res => this.category = res as Category);
  }
  
   postCategory(image: File, name : string){
    const formData = new FormData();
    formData.append('Name', name);
    formData.append('ImageFile', image);
    formData.append('ImageFileThumb', image);

     return this.http.post(this.baseUrl + '/api/Category', formData);
   }

  refreshList(){
    this.http.get(this.baseUrl + '/api/Category')
    .toPromise()
    .then(res => this.list = res as Category[]);
}
}
