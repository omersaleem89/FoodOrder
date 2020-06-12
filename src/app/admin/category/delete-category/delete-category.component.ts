import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {
  id: number;
  @Output() btn: EventEmitter<any> = new EventEmitter();
  constructor(private route: ActivatedRoute, public service: CategoryService, private router: Router) { }

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

  deleteCategory(){
    this.service.deleteCategory(this.id).subscribe(
      (res) => {
        this.service.refreshList();
        this.router.navigate(['/dashboard/category/viewCategory']);
      },
      (err) => {

      });
  }
}
