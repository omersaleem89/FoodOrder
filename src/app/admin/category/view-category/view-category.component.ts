import { Component, OnInit, Inject } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

  constructor(public service:CategoryService,@Inject('BASE_API_URL') public baseUrl: string ) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

}
