import { NgModule, Renderer2 } from "@angular/core";
import {ProductsComponent} from './components/products-page/products-page.component';
import {ProductsFilterComponent} from './components/products-filter/products-filter.component';
import { SharedModule } from '../shared/shared.module';
import { reducer } from './state/product.reducer'
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ProductEffects } from '../products/state/product.effect';
@NgModule({
declarations:[
    ProductsFilterComponent,
    ProductsComponent],
exports: [ProductsComponent, ProductsFilterComponent],
imports: [
    CommonModule,
    SharedModule,
    // редьюсер для слоя products
    StoreModule.forFeature('products', reducer),
    // инициализация эффектов
    EffectsModule.forFeature([ProductEffects])
]
})
export class ProductsModule {

}