import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeBannerComponent } from "./components/home-banner/home-banner.component";
import { HomeComponent } from "./components/home-main/home-main.component";

@NgModule({
    declarations:[
        HomeComponent,
        HomeBannerComponent
    ],
    exports: [HomeComponent, HomeBannerComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
        ]),
    ]

})
export class HomeModule {

}