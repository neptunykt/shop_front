import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, merge, mergeMap, of, tap } from 'rxjs';
import { ProductService } from './../../shared/services/product.service';
import * as productActions from './product.actions';
import { PageLoadConfig } from '../../shared/models/page-load-config';

@Injectable()
export class ProductEffects {
    constructor(private actions$: Actions, private productService: ProductService) { }
    // возвращает Observable с пагинатором, нужна подписка
    loadProducts$ = createEffect(() => {
        return this.actions$.pipe(ofType(productActions.ProductActionTypes.Load),
            map((action: productActions.Load) => action.payload),
            // mergeMap идет после map дожидаемся результата action.payload
            mergeMap((pageLoadConfig: PageLoadConfig) => {
                console.log('product effect');
                return this.productService.getProducts(pageLoadConfig.page,
                    pageLoadConfig.size, pageLoadConfig.categoryId)
                    // пайпим на новый экшион который запишет в стор результат
                    .pipe(map(paginator => new productActions.LoadSuccess(paginator)),
                        catchError(err => of(new productActions.LoadFail(err)))
                    )
            })
        )

    });
}
