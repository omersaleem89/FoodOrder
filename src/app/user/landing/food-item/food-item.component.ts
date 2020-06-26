import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodItemService } from 'src/app/service/food-item.service';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css']
})
export class FoodItemComponent implements OnInit {
id: number;
  constructor(private route: ActivatedRoute,
              public service: FoodItemService,
              @Inject('BASE_API_URL') public baseUrl: string) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.service.getFoodItem(this.id).subscribe(
      () => {

      });
  }
}
