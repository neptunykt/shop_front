import { Component, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
   selector: "project-home",
   templateUrl: "./home-main.component.html",
   styleUrls: ["./home-main.component.css"]
})
export class HomeComponent {
   public products: string;
   public services: string;
   public delivery: string;
   environmentUrl: string = environment.api;
}

