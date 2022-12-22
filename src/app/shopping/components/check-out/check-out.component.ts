import { Component, OnInit } from '@angular/core';
import {ShoppingCart} from 'src/app/shared/models/shopping-cart';
import { RootState } from "src/app/state/app.state";
import {map} from 'rxjs'
import { Store } from '@ngrx/store';
import * as fromShoppingCart from './../../../state/shopping-cart/shopping-cart.reducer';
import { Observable } from 'rxjs';
@Component({
    selector: "project-check-out",
    templateUrl: './check-out.component.html',
    styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit{
    cart$: Observable<ShoppingCart>;
    constructor(
        private store: Store<RootState>) {

    }
    ngOnInit(): void {
        this.cart$ = this.store.select(fromShoppingCart.getShoppingCartItems)
        .pipe(map(shoppingCartItems=>{
            let shoppingCart = new ShoppingCart(shoppingCartItems);
            let shoppingSum: number = 0;
            let itemsSum: number = 0;
            shoppingCartItems.map(item => {
                shoppingSum = shoppingSum + (+item.items)*(+item.product.price);
                itemsSum = itemsSum + (+item.items);
            });
            shoppingCart.totalPrice = shoppingSum;
            shoppingCart.itemsSum = itemsSum;
            return shoppingCart;
           }));
    }

}