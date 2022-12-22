import { changeShoppingCart, clearShoppingCart, removeFromShoppingCart, shoppingCartPage } from './../../../state/shopping-cart/shopping-cart.actions';
import { Component, OnInit, ViewChild} from '@angular/core';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import * as paginatorSettings from './shopping-cart-paginator.settings.json';
import * as fromShoppingCart from './../../../state/shopping-cart/shopping-cart.reducer';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { delay, of, Observable, Subscription, map } from 'rxjs';
import { ShoppingCartItem } from 'src/app/shared/models/shopping-cart-item';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { LoginService } from 'src/app/shared/services/login.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/state/app.state';
import { Product } from 'src/app/shared/models/product';
import { addToShoppingCart } from 'src/app/state/shopping-cart/shopping-cart.actions';
let intermediateJson = paginatorSettings;
const maxValue: number = 20;
@Component({
  selector: 'project-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  @ViewChild(ConfirmDialogComponent, { static: false })
  private confirmDialogComponent: ConfirmDialogComponent | undefined;
  public shoppingCartPage$: Observable<ShoppingCart>;
  public shoppingCartTotalItems$: Observable<number>;
  public shoppingCartTotalSum$: Observable<number>;
  public shoppingCartItemsSubscription$: Subscription = null;
  public shoppingCartSubscription$: Subscription = null;
  // настройки для пагинатора (число кнопок и число элементов на странице)
  paginatorPages: number = 0;
  current: number;
  totalItems$: Observable<number>;
  inputText: number = 0;
  blockInput: string = null;
  blockButton: string = null;
  totalItemsCount: number = 0;
  cartIsEmpty: boolean = false;
  environmentUrl: string = environment.api;
  totalPrice: number = 0;
  paginatorRange: number = intermediateJson.range;
  pageSize: number = intermediateJson.pageSize;

  constructor(
    private loginService: LoginService,
    private store: Store<RootState>,
    private router: Router) {

  }
  ngOnInit(): void {
    this.current = 1;
    this.totalItems$ = this.store.select(fromShoppingCart.getShoppingCartItems)
      .pipe(map(p => Math.ceil(p.length / this.pageSize)));
    this.shoppingCartPage$ = this.store.select(fromShoppingCart.getShoppingCartPage);
    this.shoppingCartTotalItems$ = this.store.select(fromShoppingCart.getShoppingCartItems)
      .pipe(map(shoppingCartItems => {
        let itemsSum: number = 0;
        shoppingCartItems.map(shoppingCartItem => {
          itemsSum = itemsSum + shoppingCartItem.items;
        });
        return itemsSum;
      }));
      this.shoppingCartTotalSum$ = this.store.select(fromShoppingCart.getShoppingCartItems)
      .pipe(map(shoppingCartItems => {
        let priceSum: number = 0;
        shoppingCartItems.map(shoppingCartItem => {
          priceSum = priceSum + (+shoppingCartItem.product.price)*(+shoppingCartItem.items);
        });
        return priceSum;
      }));
  }

  // запрет ввода других символов кроме цифр
  onKeyDown(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  onInput(event: any, item: Product) {
    let inputValue: number;
    if (event.data == null) {
      return;
    }
    else {
      inputValue = +event.target.value;
    }
    if (inputValue > maxValue) {
      // ограничение по товарам должно приходить с бека
      // в свою очередь количество товаров должно быть загружено из 1С
      inputValue = maxValue;
    }
    this.blockInput = "disabled";
    this.blockButton = "disabled";
    of(inputValue).pipe(delay(2000)).subscribe(_ => {
      // здесь надо удалить все значения и вставить новые
      var shoppingCartItem = new ShoppingCartItem(item, inputValue);
      this.store.dispatch(changeShoppingCart({ data: shoppingCartItem }));
      this.blockInput = null;
      this.blockButton = null;
    });
  }

  onAddOneItem(item: ShoppingCartItem) {
    this.blockInput = "disabled";
    if (item.items >= maxValue) {
      // вызываем ошибку максимума
      ++item.items;
    }
    of(item).pipe(delay(2000)).subscribe(_ => {
      if (item.items >= maxValue) {
        item.items = maxValue;
        this.blockInput = null;
        return true;
      }
      else {
        this.store.dispatch(addToShoppingCart({ data: item.product }));
        this.blockInput = null;
      }
    });
  }

  onRemoveOneItem(item) {
    this.blockInput = "disabled";
    of(item).pipe(delay(2000)).subscribe(_ => {
      this.store.dispatch(removeFromShoppingCart({ data: item.product }));
      // перекидываем всегда на первую страницу для простоты
      this.current = 1;
      this.onClickPaginator(this.current);
      this.blockInput = null;
    });
  }

  registerOrder() {
    if (!this.loginService.currentUser) {
      this.confirmDialogComponent.setMessageText('Для создания заказа необходимо залогинится или зарегистрироваться');
      this.confirmDialogComponent.openConfirmDialog();


    }
    else {
      this.router.navigateByUrl('check-out');
    }
  }
  onConfirmed() {
    // тут открываем LoginComponent
    this.loginService.shouldOpenLogin(true);
  }
  // приходит из дочернего компонента с метода onClick
  onClickPaginator(page: number) {
    this.current = page;
    this.store.dispatch(shoppingCartPage({ pageNumber: page, pageSize: this.pageSize }));
  }
}
