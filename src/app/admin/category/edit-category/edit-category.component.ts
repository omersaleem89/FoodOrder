import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              public service: CategoryService, private router: Router, @Inject('BASE_API_URL') public baseUrl: string) {
  }
  status = 'init';
  @Output() btn: EventEmitter<any> = new EventEmitter();
  id: number;

  categoryForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    FileUpload:  new FormControl('',
    [Validators.required])
  });

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

      this.service.putCategory(this.categoryForm, this.id).subscribe(
        (res) => {
          this.onSuccess();
        },
        (err) => {
          this.onError();
        });

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
