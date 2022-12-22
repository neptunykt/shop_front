import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as HydrationActions from './hydration.actions';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import {RootState} from './../../state/app.state';

@Injectable()
export class HydrationEffects implements OnInitEffects {
  hydrate$ = createEffect(() =>
    this.action$.pipe(
      ofType(HydrationActions.hydrate),
      map(() => {
        const storageValue = localStorage.getItem("state");
        if (storageValue) {
          try {
            const state = JSON.parse(storageValue);
            return HydrationActions.hydrateSuccess({ state });
          } catch {
            localStorage.removeItem("state");
          }
        }
        console.log('hydrate failure')
        return HydrationActions.hydrateFailure();
      })
    )
  );

  serialize$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          HydrationActions.hydrateSuccess,
          HydrationActions.hydrateFailure
        ),
        switchMap(() => this.store),
        distinctUntilChanged(),
        tap(state => {
          console.log('serializing');
          localStorage.setItem("state", JSON.stringify(state));   
      })
      ),
      // чтобы не попасть в бесконечный цикл
      {dispatch: false}
  );

  constructor(private action$: Actions, private store: Store<RootState>) {}

  ngrxOnInitEffects(): Action {
    //  init hydrate effect - начальная загрузка страницы вызов  HydrationActions.hydrate
    return HydrationActions.hydrate();
  }
}
