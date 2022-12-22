import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'project-user-order-detail',
    templateUrl: './user-order-detail.component.html',
    styleUrls: ['./user-order-detail.component.css']
})
export class UserOrderDetailComponent implements OnInit {
   ngOnInit(): void {
     this.url = 'my-orders';
   }
   url: 'my-orders'
}