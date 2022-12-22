import { ShoppingCartCounter } from './../../shared/models/shopping-cart-counter';
import { ProductActions, ProductActionTypes } from "./product.actions";
import { Paginator } from './../../shared/models/paginator';
import { Product } from "src/app/shared/models/product";
/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const initialState: ProductState = {
  productPage: null,
  error: ''
}
export interface ProductState {
  productPage: Paginator<Product> | null,
  error: string
}

// Selector functions указывает на слой в Stat-e
const getProductFeatureState = createFeatureSelector<ProductState>('products');


export const getProductPage = createSelector(
  getProductFeatureState,
  state => state.productPage
)


export function reducer(state = initialState, action: ProductActions): ProductState {
  
  switch (action.type) {
    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        productPage: action.payload,
        error: ''
      };
    default:
      return state;
  }
}