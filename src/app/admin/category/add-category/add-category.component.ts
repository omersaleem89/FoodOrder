import { Component, OnInit, Inject } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { Router } from '@angular/router';

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
  name:string;
  constructor(public service: CategoryService,private router: Router) { }

  ngOnInit(): void {
    
  }

  onSubmit(){
    
    this.service.postCategory(this.selectedFile.file,this.name).subscribe(
      (res) => {
        this.service.refreshList();
        this.router.navigate(["dashboard/category/viewCategory"]);
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
