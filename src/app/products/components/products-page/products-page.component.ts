import { addToShoppingCart } from '../../../state/shopping-cart/shopping-cart.actions';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';
import * as paginatorSettings from '../products-paginator.settings.json';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import * as productActions from '../../state/product.actions';
import { Store } from '@ngrx/store';
import { RootState } from '../../../state/app.state';
import * as fromProduct from '../../state/product.reducer';
import { map, Observable } from 'rxjs';
import { Paginator } from 'src/app/shared/models/paginator';
import { environment } from 'src/environments/environment';
let intermediateJson = paginatorSettings;
@Component({
  selector: 'project-products',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsComponent implements OnInit {
  totalItems: number;
  environmentUrl: string = environment.api;
  currentProductId: string;
  categoryId: string;
  componentActive = true;
  imageUrl: any;
  paginatorRange: number = intermediateJson.range;
  pageSize: number = intermediateJson.pageSize;
  products$: Observable<Product[]>;
  productPage: Paginator<Product>;
  current: number = 1;
  maskUserName: any;
  currentProductId$: Observable<string>;
  totalPages: number;
  constructor(public productService: ProductService,
    public cartService: ShoppingCartService,
    private store: Store<RootState>,
  ) {
  }
  // селектор нужен для выбора из стора определенного слоя
  ngOnInit(): void {
    this.current = 1;
    this.store.select(fromProduct.getProductPage).subscribe(p=> {
          this.totalItems = Math.ceil(p.recordCount / this.pageSize);
      });
    this.products$ = this.store.select(fromProduct.getProductPage)
      .pipe(map(p => { if (p != null) { return p.items; } }));
  }

  onClickProductFilter(category: Category) {
    // диспатчим 1-ую страницу, которую прослушивает эффект с категорией
    this.categoryId = category.id;
    this.current = 1;
    this.store.dispatch(new productActions.Load(
      {
        page: 1,
        size: this.pageSize,
        categoryId: this.categoryId
      }));
      this.store.select(fromProduct.getProductPage).subscribe(p=> {
        this.totalItems = Math.ceil(p.recordCount / this.pageSize);
    });

  }

  // приходит из дочернего компонента
  onClickPaginator(page: number) {
    this.current = page;
    this.store.dispatch(new productActions.Load(
      {
        page: page,
        size: this.pageSize,
        categoryId: this.categoryId
      }));
  }
  addToCart(product: Product) {
    this.store.dispatch(addToShoppingCart({ data: product }));
  }

}