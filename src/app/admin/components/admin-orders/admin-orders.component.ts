import { Component, OnInit, ViewChild } from "@angular/core";
import { Shipping } from "src/app/shared/models/shipping";
import * as paginatorSettings from './admin-orders-paginator.settings.json';
import { OrderService } from "src/app/shared/services/order.service";
import { ActivatedRoute, Router } from "@angular/router";
import { map, Observable, pipe } from "rxjs";
let intermediateJson = paginatorSettings;
@Component({
  selector: 'project-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders$: Observable<Shipping[]>;
  totalItems: number;
  userId: string;
  current: number;
  paginatorRange: number = intermediateJson.range;
  pageSize: number = intermediateJson.pageSize;
  constructor(private orderService: OrderService, private router: Router, 
    private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    // здесь делаем запрос по всем заказам с пагинацией
  this.current = 1;
  
    this.orderService.getOrdersByAdmin(this.current, this.pageSize).subscribe(p=> {
      if (p != null) {
      this.totalItems = Math.ceil(p.recordCount / this.pageSize);
      this.orders$ = this.orderService.getOrdersByAdmin(this.current, this.pageSize).pipe(map(p => p.items));
      }
    });
  }

  onClickPaginator(page: number) {
    this.current = page;
  

    this.orderService.getOrdersByAdmin(this.current, this.pageSize).subscribe(p=> {
      if (p != null) {
        this.orders$ = this.orderService.getOrdersByAdmin( this.current, this.pageSize).pipe(map(p=>p.items));
      this.totalItems = Math.ceil(p.recordCount / this.pageSize);
      }
    });
  }

  onOrderClick(order: Shipping) {
    this.router.navigate(['admin-order-detail', order.id], { relativeTo: this.route });
  }

  onOrderDeleteClick(order: Shipping) {
    this.orderService.delete(order.id).subscribe(_ => {
      this.current = 1;
        // еще раз запрос для страницы
        this.onClickPaginator(this.current);
      });
  }
}