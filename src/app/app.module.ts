import { HydrationEffects } from './state/hydration/hydration.effects';
import { metaReducers, reducers } from './state/app.state';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { HomeModule } from '../app/home/home.module';
import { ProductsModule } from '../app/products/products.module';
import {ShoppingModule} from '../app/shopping/shopping.module';
import {AdminModule} from '../app/admin/admin.module';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
@NgModule({
    imports: [BrowserModule, RouterModule,
        FormsModule,
        AppRoutingModule,
        SharedModule, HttpClientModule, CoreModule,
        HomeModule, ProductsModule, AdminModule,
        ShoppingModule,
          // инициализация стора (редьюсер - пустой объект)
        StoreModule.forRoot(reducers, {metaReducers}),
        // инициализация эффектов
        EffectsModule.forRoot([HydrationEffects]),
          // это для оталдчика DevTools в браузере
        StoreDevtoolsModule.instrument({
            name: 'APM Demo App DevTools',
            maxAge: 25,
            logOnly: environment.production,
          }) 
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    exports: [
    ]
})
export class AppModule { }