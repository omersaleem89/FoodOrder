import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
import { HttpClient } from '@angular/common/http';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  selectedFile: ImageSnippet;
  constructor(public service: CategoryService) { }

  ngOnInit(): void {
    
  }

  onSubmit(){
    
    this.service.postCategory(this.selectedFile.file).subscribe(
      (res) => {
      
      },
      (err) => {
      
      })
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

    });

    reader.readAsDataURL(file);
  }
}
