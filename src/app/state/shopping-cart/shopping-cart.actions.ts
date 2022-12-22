import { ShoppingCartItem } from './../../shared/models/shopping-cart-item';
import { createAction, props } from "@ngrx/store";
import { Product } from "../../shared/models/product";

export const addToShoppingCart = createAction('[Shopping Cart] Increment', props<{data:Product}>());
export const removeFromShoppingCart = createAction('[Shopping Cart] Decrement', props<{data:Product}>());
export const changeShoppingCart = createAction('[Shopping Cart] Change', props<{data:ShoppingCartItem}>());
export const shoppingCartPage = createAction('[Shopping Cart] ShoppingCart Page', props<{pageNumber: number, pageSize: number}>());
export const clearShoppingCart = createAction('[Shopping Cart] Clear');