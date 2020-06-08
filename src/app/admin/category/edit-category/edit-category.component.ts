import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private service: CategoryService) { }

  ngOnInit(): void {
    this.getCategory();
  }
  
  getCategory(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getCategory(id); 
  }

}
