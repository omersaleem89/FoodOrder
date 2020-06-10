import { Component, OnInit, Inject, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { Router } from '@angular/router';
import { ImageSnippet } from 'src/app/service/image-snippet';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
 // selectedFile: ImageSnippet;
  
  status: string = 'init';
  @Output() btn: EventEmitter<any> = new EventEmitter();
  constructor(public service: CategoryService,private router: Router) { }

  ngOnInit(): void {
    this.setAddButton(false)
    
  }
  categoryForm = new FormGroup({
    "name": new FormControl('', [
      Validators.required
    ]),
    "FileUpload":  new FormControl("",
    [Validators.required])
  })
  setAddButton(data) {
    // emit data to parent component
    this.btn.emit(data);
  }
  onSubmit(){
    this.service.postCategory(this.categoryForm).subscribe(
      (res) => {
        this.onSuccess();
      },
      (err) => {
        this.onError();
      })
  }

  private onSuccess() {
    this.status = 'ok';
    this.router.navigate(['/dashboard/category/viewCategory']);
  }

  private onError() {
    this.status = 'fail';
  }

  processFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.categoryForm.patchValue({
        FileUpload: file
      });
    }
  }
}
