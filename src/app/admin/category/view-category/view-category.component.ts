import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

  @Output() btn: EventEmitter<any> = new EventEmitter();
  constructor(public service:CategoryService,@Inject('BASE_API_URL') public baseUrl: string ) { }

  ngOnInit(): void {
    this.setAddButton(true);
    this.service.refreshList();
  }

  setAddButton(data) {
    // emit data to parent component
    this.btn.emit(data);
  }
}
