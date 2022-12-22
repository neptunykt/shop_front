import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Category } from '../../../shared/models/category';
import { CategoryService } from '../../../shared/services/category.service';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'project-products-filter',
    templateUrl: './products-filter.component.html',
    styleUrls: ['./products-filter.component.css']
  })
  export class ProductsFilterComponent implements AfterViewInit {
    categories: Category[];
    // входные данные
    @Output() onClick = new EventEmitter<Category>();
      constructor(public categoryService: CategoryService){
      }
  ngAfterViewInit(): void {
    this.categoryService.getCategories().subscribe(
      categories => {this.categories = categories;
        this.categories.forEach(category => {
          category.imageLink = `${environment.api}${category.imageUrl}`;
          });
     });
  }
    
      onClickCategory(category: Category) {
        this.onClick.emit(category);
      }
  }