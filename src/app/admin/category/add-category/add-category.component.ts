import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
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
  selectedFile: ImageSnippet;
  name:string;
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
    this.service.postCategory(this.selectedFile.file,this.name).subscribe(
      (res) => {
        this.onSuccess();
      },
      (err) => {
        this.onError();
      })
  }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
    this.router.navigate(['/dashboard/category/viewCategory']);
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
    });

    reader.readAsDataURL(file);
  }
}
