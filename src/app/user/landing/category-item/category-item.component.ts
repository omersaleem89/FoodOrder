import { Component, OnInit, Inject } from '@angular/core';
import { FoodItemService } from 'src/app/service/food-item.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {
  id: number;
  constructor(private route: ActivatedRoute, public categoryService: CategoryService, public service: FoodItemService, @Inject('BASE_API_URL') public baseUrl: string) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.service.getCategoryItems(this.id);
    this.categoryService.getCategory(this.id);
  }

}
