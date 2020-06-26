import { Component, OnInit, Inject } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(public service: CategoryService, @Inject('BASE_API_URL') public baseUrl: string) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

}
