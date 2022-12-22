import { ShoppingCartCounter } from './../../shared/models/shopping-cart-counter';
import { ShoppingCartItem } from './../../shared/models/shopping-cart-item';
import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { changeShoppingCart, removeFromShoppingCart, addToShoppingCart, shoppingCartPage, clearShoppingCart } from "./shopping-cart.actions";
import * as paginator from './../../shared/front-paginator/paginator';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';

export interface ShoppingCartState {
    shoppingCartItems: ShoppingCartItem[],
    shoppingCartPage: ShoppingCart;
    shoppingCartCounter: ShoppingCartCounter,
}
export const initialState: ShoppingCartState = {
    shoppingCartItems: [],
    shoppingCartPage: null,
    shoppingCartCounter: new ShoppingCartCounter(0, 0)
}

const getShoppingCartFeatureState = createFeatureSelector<ShoppingCartState>('shoppingCart');

export const getShoppingCartItems = createSelector(
    getShoppingCartFeatureState,
    state => state.shoppingCartItems
);

export const getShoppingCounter = createSelector(
    getShoppingCartFeatureState,
    state => state.shoppingCartCounter
)

export const getShoppingCartPage = createSelector(
    getShoppingCartFeatureState,
    state => state.shoppingCartPage
)



export const reducer = createReducer(
    initialState,
    on(addToShoppingCart, (state, payload) => {
        let shoppingCartItemsCopy = [...state.shoppingCartItems];
        let shoppingCartCounterCopy = { ...state.shoppingCartCounter };
        let shoppingCartPageCopy = { ...state.shoppingCartPage } as ShoppingCart;
        const seacrhIndex = shoppingCartItemsCopy.findIndex(i => i.product.id == payload.data.id);
        if (seacrhIndex == -1) {
            shoppingCartItemsCopy.push(new ShoppingCartItem(payload.data, 1));
            shoppingCartCounterCopy = new ShoppingCartCounter(shoppingCartCounterCopy.itemsSum + 1, shoppingCartCounterCopy.totalPrice + (+payload.data.price));
        }
        else {
            shoppingCartItemsCopy[seacrhIndex] = new ShoppingCartItem(payload.data, shoppingCartItemsCopy[seacrhIndex].items + 1);
            shoppingCartCounterCopy = new ShoppingCartCounter(shoppingCartCounterCopy.itemsSum + 1, +shoppingCartCounterCopy.totalPrice + (+payload.data.price));
        }
        let shoppingCartPageItems = paginator.frontPaginate<ShoppingCartItem>(shoppingCartItemsCopy, 1, 3);
        shoppingCartPageCopy.items = shoppingCartPageItems;
        shoppingCartPageCopy.itemsPageSum = 0;
        shoppingCartPageCopy.totalPagePrice = 0;
        shoppingCartPageItems.map(item => {
            shoppingCartPageCopy.itemsPageSum = shoppingCartPageCopy.itemsPageSum + (+item.items);
            shoppingCartPageCopy.totalPagePrice = shoppingCartPageCopy.totalPagePrice + (+item.items) * (+item.product.price);
        });
        return {
            ...state,
            shoppingCartItems: shoppingCartItemsCopy,
            shoppingCartCounter: shoppingCartCounterCopy,
            shoppingCartPage: shoppingCartPageCopy
        };
    }),
    on(removeFromShoppingCart, (state, payload) => {
        let shoppingCartItemsCopy = [...state.shoppingCartItems];
        let shoppingCartCounterCopy = { ...state.shoppingCartCounter };
        let shoppingCartPageCopy = { ...state.shoppingCartPage } as ShoppingCart;

        const seacrhIndex = shoppingCartItemsCopy.findIndex(i => i.product.id == payload.data.id);
        if (seacrhIndex == -1) {
            return {
                ...state,
                shoppingCartItems: shoppingCartItemsCopy,
                shoppingCartCounter: shoppingCartCounterCopy,
                shoppingCartPage: shoppingCartPageCopy
            };
        }
        else {
            shoppingCartCounterCopy = new ShoppingCartCounter(shoppingCartCounterCopy.itemsSum - 1, +shoppingCartCounterCopy.totalPrice - (+payload.data.price));
            if (shoppingCartItemsCopy[seacrhIndex].items == 1) {
                shoppingCartItemsCopy = shoppingCartItemsCopy.filter(f => f.product.id !== payload.data.id);
            } else {
                shoppingCartItemsCopy[seacrhIndex] = new ShoppingCartItem(payload.data, shoppingCartItemsCopy[seacrhIndex].items - 1);
            }
            let shoppingCartPageItems = paginator.frontPaginate<ShoppingCartItem>(shoppingCartItemsCopy, 1, 3);
            shoppingCartPageCopy.items = shoppingCartPageItems;
            shoppingCartPageCopy.itemsPageSum = 0;
            shoppingCartPageCopy.totalPagePrice = 0;
            shoppingCartPageItems.map(item => {
                shoppingCartPageCopy.itemsPageSum = shoppingCartPageCopy.itemsPageSum + (+item.items);
                shoppingCartPageCopy.totalPagePrice = shoppingCartPageCopy.totalPagePrice + (+item.items) * (+item.product.price);
            });
            return {
                ...state,
                shoppingCartItems: shoppingCartItemsCopy,
                shoppingCartCounter: shoppingCartCounterCopy,
                shoppingCartPage: shoppingCartPageCopy,
            };

        }
    }),
    on(shoppingCartPage, (state, payload) => {
        let shoppingCartItemsCopy = [...state.shoppingCartItems];
        let shoppingCartPageCopy = { ...state.shoppingCartPage } as ShoppingCart;
        let shoppingCartPageItems = paginator.frontPaginate<ShoppingCartItem>(shoppingCartItemsCopy, payload.pageNumber, payload.pageSize);
        shoppingCartPageCopy.items = shoppingCartPageItems;
        shoppingCartPageCopy.itemsPageSum = 0;
        shoppingCartPageCopy.totalPagePrice = 0;
        shoppingCartPageItems.map(item => {
            shoppingCartPageCopy.itemsPageSum = shoppingCartPageCopy.itemsPageSum + (+item.items);
            shoppingCartPageCopy.totalPagePrice = shoppingCartPageCopy.totalPagePrice + (+item.items) * (+item.product.price);
        });
        console.log('return from shoppingCartPage reducer');
        return {
            ...state,
            shoppingCartPage: shoppingCartPageCopy
        };
    }),
    on(changeShoppingCart, (state, payload) => {
        let shoppingCartItemsCopy = [...state.shoppingCartItems];
        let shoppingCartCounterCopy = { ...state.shoppingCartCounter };
        let shoppingCartPageCopy = { ...state.shoppingCartPage } as ShoppingCart;
        const seacrhIndex = shoppingCartItemsCopy.findIndex(i => i.product.id == payload.data.product.id);
        if (seacrhIndex == -1) {
            shoppingCartItemsCopy.push(new ShoppingCartItem(payload.data.product, payload.data.items));
            shoppingCartCounterCopy = new ShoppingCartCounter(shoppingCartCounterCopy.itemsSum +
                (+payload.data.items), +shoppingCartCounterCopy.totalPrice + (+payload.data.items) * (+payload.data.product.price));

        }
        else {
            // сперва находим прошлую сумму и число айтемов
            let lastTotalPrice = shoppingCartItemsCopy[seacrhIndex].product.price * shoppingCartItemsCopy[seacrhIndex].items;
            let lastItems = shoppingCartItemsCopy[seacrhIndex].items;
            shoppingCartItemsCopy[seacrhIndex] = new ShoppingCartItem(payload.data.product, +payload.data.items);
            // вычитаем прошлую сумму и число айтемов
            shoppingCartCounterCopy = new ShoppingCartCounter(shoppingCartCounterCopy.itemsSum - lastItems + (+payload.data.items),
                shoppingCartCounterCopy.totalPrice - (+lastTotalPrice) + (+payload.data.items) * (+payload.data.product.price));

        }
        let shoppingCartPageItems = paginator.frontPaginate<ShoppingCartItem>(shoppingCartItemsCopy, 1, 3);
        shoppingCartPageCopy.items = shoppingCartPageItems;
        shoppingCartPageCopy.itemsPageSum = 0;
        shoppingCartPageCopy.totalPagePrice = 0;
        shoppingCartPageItems.map(item => {
            shoppingCartPageCopy.itemsPageSum = shoppingCartPageCopy.itemsPageSum + (+item.items);
            shoppingCartPageCopy.totalPagePrice = shoppingCartPageCopy.totalPagePrice + (+item.items) * (+item.product.price);
        });

        return {
            ...state,
            shoppingCartItems: shoppingCartItemsCopy,
            shoppingCartCounter: shoppingCartCounterCopy,
            shoppingCartPage: shoppingCartPageCopy
        };
    }),
    on(clearShoppingCart, (state, _) => {
        console.log('clear shopping cart');
        state = initialState;
        return {
            ...state,
            shoppingCartItems: [],
            shoppingCartPage: null,
            shoppingCartCounter: new ShoppingCartCounter(0, 0)
        };
    })
);