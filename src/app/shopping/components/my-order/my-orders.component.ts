import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderService} from 'src/app/shared/services/order.service';
import {Shipping} from 'src/app/shared/models/shipping';
import * as paginatorSettings from './my-orders-paginator.settings.json';
import {LoginService} from 'src/app/shared/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
let intermediateJson = paginatorSettings;
@Component({
    selector: 'project-my-orders',
    templateUrl: './my-orders.component.html',
    styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit{
orders$: Observable<Shipping[]>;
totalItems: number;
userId: string;
current: number;
paginatorRange: number = intermediateJson.range;
pageSize: number = intermediateJson.pageSize;
constructor(private orderService: OrderService, private loginService: LoginService, private router: Router, private route: ActivatedRoute){

}
    ngOnInit(): void {
      this.current = 1;
     this.userId = this.loginService.currentUserId;
     this.orderService.getOrdersByUser(this.current, this.pageSize, this.userId).subscribe(p=> {
      if (p != null) {
      this.totalItems = Math.ceil(p.recordCount / this.pageSize);
      this.orders$ = this.orderService.getOrdersByUser(1,this.pageSize,this.userId).pipe(map(p => p.items));
      }
    });
    }
    onClickPaginator(page: number) {
      this.current = page;
      this.orderService.getOrdersByUser(this.current, this.pageSize, this.userId).subscribe(p=> {
        if (p != null) {
        this.totalItems = Math.ceil(p.recordCount / this.pageSize);
        this.orders$ = this.orderService.getOrdersByUser(1,this.pageSize,this.userId).pipe(map(p => p.items));
        }
      });
      }
    
      onOrderClick(order: Shipping) {
        this.router.navigate(['order-detail', order.id],{relativeTo: this.route});
      }
}
