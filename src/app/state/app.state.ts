import { ShoppingCartItem } from './../shared/models/shopping-cart-item';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromProducts from '../products/state/product.reducer';
import * as fromShoppingCartItems from './shopping-cart/shopping-cart.reducer';
import { hydrationMetaReducer } from './hydration/hydration.reducer';
// Representation of the entire app state
export interface RootState {
    products: fromProducts.ProductState
    shoppingCart: fromShoppingCartItems.ShoppingCartState
}
// основной reducer включает более атомарные редьюсеры
export const reducers: ActionReducerMap<RootState> = {
    products: fromProducts.reducer,
    shoppingCart: fromShoppingCartItems.reducer
};
// Metareducer это middleware - вызывается всегда
export const metaReducers: MetaReducer[] = [
    hydrationMetaReducer
]