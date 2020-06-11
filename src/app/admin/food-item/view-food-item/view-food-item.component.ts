import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FoodItemService } from 'src/app/service/food-item.service';

@Component({
  selector: 'app-view-food-item',
  templateUrl: './view-food-item.component.html',
  styleUrls: ['./view-food-item.component.css']
})
export class ViewFoodItemComponent implements OnInit {
  @Output() btn: EventEmitter<any> = new EventEmitter();
  constructor(public service:FoodItemService,@Inject('BASE_API_URL') public baseUrl: string ) { }

  ngOnInit(): void {
    this.setAddButton(true);
    this.service.refreshList();
  }

  setAddButton(data) {
    // emit data to parent component
    this.btn.emit(data);
  }

}
