import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

  constructor(public service:CategoryService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

}
