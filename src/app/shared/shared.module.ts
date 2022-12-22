import { CommonModule } from '@angular/common';
import { NgModule, RendererFactory2 } from '@angular/core';
import { AuthGuardService } from './services/auth-guard.service';
import { CategoryService } from './services/category.service';
import { LoginService } from './services/login.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';
import { AuthInterceptor } from '../shared/interceptors/auth-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RendererService } from './components/renderer-service';
import { ModalComponent } from './components/private-common/_modal/modal.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import {LoginComponent} from './components/login/login.component';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import {ImageLoaderComponent} from './components/image-loader/image-loader.component';
import {AdminProductDetailComponent} from './components/admin-product-detail/admin-product-detail.component';
import {ImageService} from './services/image.service';
import {PriceValidatorDirective} from './validator/price-validator';

@NgModule({
  declarations: [
    // добавляем компоненты, которые будут использоваться в этом модуле
    ModalComponent,
    PaginatorComponent,
    LoginComponent,
    ConfirmDialogComponent,
    OrderDetailComponent,
    ImageLoaderComponent,
    AdminProductDetailComponent,
    PriceValidatorDirective
  ],
  exports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PaginatorComponent,
    LoginComponent,
    ConfirmDialogComponent,
    OrderDetailComponent,
    AdminProductDetailComponent,
    ImageLoaderComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    LoginService,
    AuthGuardService,
    CategoryService,
    UserService,
    ProductService,
    ShoppingCartService,
    OrderService,
    // этот сервис нужен для инжектирования в PaginatorComponent
    // для сторонних компонентов (функционал Renderer2)
    RendererService,
    ImageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ]
})
export class SharedModule { }
