import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/shared/services/image.service';
@Component({
    selector: 'project-admin-order-detail',
    templateUrl: './admin-order-detail.component.html',
    styleUrls: ['./admin-order-detail.component.css']
})
export class AdminOrderDetailComponent implements OnInit {
  constructor(){

  }
   ngOnInit(): void {
     this.url = 'admin-orders';
   }
   url: 'admin-orders'
}