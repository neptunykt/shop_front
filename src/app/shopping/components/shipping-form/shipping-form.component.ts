import { RootState } from 'src/app/state/app.state';
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {ShoppingCart} from 'src/app/shared/models/shopping-cart';
import {LoginService} from 'src/app/shared/services/login.service';
import {OrderService} from 'src/app/shared/services/order.service';
import {Order} from 'src/app/shared/models/order';
import { ConfirmDialogComponent } from "src/app/shared/components/confirm-dialog/confirm-dialog.component";
import { Store } from '@ngrx/store';
import { clearShoppingCart } from 'src/app/state/shopping-cart/shopping-cart.actions';

@Component({
selector:'project-shipping-form',
templateUrl: './shipping-form.component.html',
styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
    @Input('cart') cart: ShoppingCart;
    @ViewChild(ConfirmDialogComponent, { static: false })
    private confirmDialogComponent: ConfirmDialogComponent | undefined;
    shipping = {
      name:'',
      addressLine1: '',
      addressLine2: '',
      city: '',
    };
    userId: string;
    constructor(private router: Router, private loginService: LoginService,
        private orderService:OrderService, private store: Store<RootState>){}
  placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    
     this.orderService.placeOrder(order).subscribe(
        _=> {
          this.confirmDialogComponent.setMessageText("Вы успешно создали заказ!");
          this.confirmDialogComponent.openConfirmDialog();
        }
   );
  }
  ngOnInit() {
    this.userId = this.loginService.currentUserId;
  }

  onConfirmed() {
    this.store.dispatch(clearShoppingCart());
    this.router.navigateByUrl('');
  }

}