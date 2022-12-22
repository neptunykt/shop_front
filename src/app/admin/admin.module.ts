import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AdminOrdersComponent } from "../admin/components/admin-orders/admin-orders.component";
import { AdminProductsComponent } from "../admin/components/admin-products/admin-products.component";
import { AdminProductEditComponent } from "./components/admin-product-edit/admin-product-edit.component";
import {AdminProductAddComponent} from "./components/admin-product-add/admin-product-add.component";
import { AdminOrderDetailComponent } from "./components/admin-order-detail/admin-order-detail.component";

@NgModule({
    declarations: [
        AdminOrdersComponent, AdminProductsComponent,
        AdminProductAddComponent,
        AdminProductEditComponent,
        AdminOrderDetailComponent
    ],
    exports: [AdminOrdersComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: 'admin-orders',
                component: AdminOrdersComponent
            },
            {
                path: 'admin-orders/admin-order-detail/:id',
                component: AdminOrderDetailComponent
            },
            {
                path: 'admin-products',
                component: AdminProductsComponent
            },
            {
                path: 'admin-products/admin-product-edit/:id',
                component: AdminProductEditComponent
            },
            {
                path: 'admin-products/admin-product-add',
                component: AdminProductAddComponent
            }
        ]),
    ]
})
export class AdminModule {

}