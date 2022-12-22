import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import {ShoppingCart} from 'src/app/shared/models/shopping-cart';

@Component({
    selector: 'project-shopping-cart-summary',
    templateUrl: './shopping-cart-summary.component.html',
    styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent {
    @Input() cart: ShoppingCart;
}