import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageSnippet } from 'src/app/service/image-snippet';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  selectedFile: ImageSnippet;
  @Output() btn: EventEmitter<any> = new EventEmitter();
  id: number;
  constructor(private route: ActivatedRoute,
    public service: CategoryService, private router:Router,@Inject('BASE_API_URL') public baseUrl: string) {
  }

  ngOnInit(): void {
    this.setAddButton(false);
    this.getCategory();
  }

  setAddButton(data) {
    // emit data to parent component
    this.btn.emit(data);
  }
  getCategory(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.service.getCategory(this.id);
  }

  onSubmit() {
    if (this.selectedFile != null) {
      this.service.putCategory(this.selectedFile.file, this.service.category.Name, this.id).subscribe(
        (res) => {
          this.onSuccess();
        },
        (err) => {
          this.onError();
        });
    }
    else{
      this.service.putCategory(null, this.service.category.Name, this.id).subscribe(
        (res) => {
          this.onSuccess();
        },
        (err) => {
          this.onError();
        });
    }
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
