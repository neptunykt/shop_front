import { RootState } from 'src/app/state/app.state';
import { map, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromProducts from '../../../products/state/product.reducer';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';
import * as paginatorSettings from './admin-products.settings.json';
import * as productActions from './../../../products/state/product.actions';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
let intermediateJson = paginatorSettings;
@Component({
  selector: 'project-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  paginatorRange: number = intermediateJson.range;
  pageSize: number = intermediateJson.pageSize;
  products$: Observable<Product[]>;
  totalItems: number;
  environmentUrl: string = environment.api;
  imageProductArray: string[];
  hasProducts: boolean;
  current: number;
  constructor(private productService: ProductService, 
    private router: Router, private route: ActivatedRoute, private store: Store<RootState>) { }
  ngOnInit() {
   this.current = 1;
   this.store.select(fromProducts.getProductPage).subscribe(p=> {
    this.totalItems = Math.ceil(p.recordCount / this.pageSize);
   });
   
   this.products$ = this.store.select(fromProducts.getProductPage).pipe(map(productPage => productPage.items));
  }
  // приходит из дочернего компонента
  onClickPaginator(page: number) {
    this.current = page;
    this.store.dispatch(new productActions.Load({page: this.current,size: this.pageSize, categoryId: null}));
    this.store.select(fromProducts.getProductPage).subscribe(p=> {
      this.totalItems = Math.ceil(p.recordCount / this.pageSize);
     });
  }
  onProductEdit(product: Product) {
    this.router.navigate(['admin-product-edit', product.id], { relativeTo: this.route });

  }
  onProductDelete(product: Product) {
    this.productService.delete(product.id).subscribe(_ => {
      this.store.dispatch(new productActions.Load({page: 1,size: this.pageSize, categoryId: null}));
        this.current = 1;
        this.onClickPaginator(this.current);
        this.store.select(fromProducts.getProductPage).subscribe(p=> {
          this.totalItems = Math.ceil(p.recordCount / this.pageSize);
         });
      })
  }

}
