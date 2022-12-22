import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import {ShoppingCartComponent} from 'src/app/shopping/components/shopping-cart/shopping-cart.component';
import {ShippingFormComponent} from 'src/app/shopping/components/shipping-form/shipping-form.component';
import {ShoppingCartSummaryComponent} from 'src/app/shopping/components/shopping-cart-summary/shopping-cart-summary.component';
import {CheckOutComponent} from 'src/app/shopping/components/check-out/check-out.component';
import {MyOrdersComponent} from 'src/app/shopping/components/my-order/my-orders.component';
import {UserOrderDetailComponent} from 'src/app/shopping/components/user-order-detail/user-order-detail.component';
import { ProductsComponent } from "../products/components/products-page/products-page.component";

@NgModule({
    declarations:[
        ShoppingCartComponent,
        ShippingFormComponent,
        ShoppingCartSummaryComponent,
        CheckOutComponent,
        MyOrdersComponent,
        UserOrderDetailComponent
       ],
    exports: [ShoppingCartComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: 'products',
                component: ProductsComponent
              },
              {
                path:'shopping-cart',
                component: ShoppingCartComponent
              },
              {
                path: 'check-out',
                component: CheckOutComponent
              },
              {
                path: 'my-orders',
                component: MyOrdersComponent
              },
              {
                  path: 'my-orders/order-detail/:id',
                  component: UserOrderDetailComponent
              }
        ]),
    ]
    })
    export class ShoppingModule{

    }