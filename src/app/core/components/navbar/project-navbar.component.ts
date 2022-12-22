import { Component, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subscription } from "rxjs";
import { Router } from '@angular/router';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { ShoppingCartCounter } from 'src/app/shared/models/shopping-cart-counter';
import { LoginComponent } from 'src/app/shared/components/login/login.component';
import { LoginService } from 'src/app/shared/services/login.service';
import { RootState } from 'src/app/state/app.state';
import * as fromShoppingCartItems from './../../../state/shopping-cart/shopping-cart.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'project-navbar',
  templateUrl: './project-navbar.component.html',
  styleUrls: ['./project-navbar.component.css']
})
export class ProjectNavbarComponent implements OnInit {

  // юзаем дочернюю компоненту - передаем туда данные
  @ViewChild(LoginComponent, { static: false })
  private loginComponent: LoginComponent | undefined;

  itemsSum: number = 0;
  showLinkHorizontal: boolean = true;
  resizeObservable$: Observable<Event>
  resizeSubscription$: Subscription
  shoppingCartCounter: ShoppingCartCounter;
  cart$: Observable<ShoppingCart>;

  constructor(
    private shoppingCartService: ShoppingCartService,
    public loginService: LoginService,
    private store: Store<RootState>,
    private router: Router
  ) {

  }
  ngOnInit() {
    // чтобы просекать изменение окна и закрывать открытый бургер
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe(() => {
      if (!this.showLinkHorizontal) {
        this.showLinkHorizontal = true;
      }
    });

    // подписываемся на вызов диалога чтобы открывать его в других
    // компонентах
    this.loginService.shouldOpenLoginDialog$.subscribe(shouldOpen => {
      // вызываем открытие диалога
      if (shouldOpen) {
        this.loginComponent.openLoginRegister('login__form');
        // снимаем флаг
        this.loginService.shouldOpenLogin(false);
      }
    });
    this.shoppingCartService.getOrCreateShoppingCartId().subscribe(_ => {
      this.store.select(fromShoppingCartItems.getShoppingCounter).subscribe(result => {
        this.itemsSum = result.itemsSum;
      });
    });
  }
  // здесь добавляем loginService - определяем залогинен ли юзер
  openLoginRegister(id: string) {
    this.router.navigateByUrl('/');
    // передаем в дочерний компонент - он сам разберется
    this.loginComponent.openLoginRegister(id);
  }

  checkIsAdmin() {
    return this.loginService.isAdmin;
  }

  onExitLogin() {
    // передаем в дочерний компонент - он сам разберется
    this.loginComponent.onExitLogin();
  }


  onToggleMenu(event) {
    event.preventDefault();
    this.showLinkHorizontal = !this.showLinkHorizontal;
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe();
  }

}