import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { OrderItem } from 'src/app/shared/models/order-item';
import { Subscription } from 'rxjs';
import { ImageService } from '../../services/image.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
    selector: 'project-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent {
    id: string;
    totalPrice: number = 0;
    quantity: number = 0;
   @Input('backUrl') backUrl: string;
    orders: OrderItem[];
    private routeSubscription: Subscription;
    constructor(private route: ActivatedRoute, private domSanitizer: DomSanitizer,
         private imageService: ImageService, private  router:Router, private orderService: OrderService) {
        this.routeSubscription = route.params.subscribe(params => {

            this.id = params['id'];
            this.orderService.get(this.id).subscribe(
                orders => {
                    this.orders = orders;
                    this.quantity = 0;
                    this.totalPrice = 0;
                    orders.forEach(item => {
                        this.imageService.loadPicture(item.product.imageUrl).subscribe(data=>{
                            item.imageLink = this.domSanitizer
                            .bypassSecurityTrustResourceUrl(URL.createObjectURL(data));
                        });
                        this.quantity = this.quantity + item.quantity;
                        this.totalPrice = this.totalPrice + Number(item.product.price)*item.quantity;

                    });
                }
            )

        }
        );
    }
    backToOrders(){
this.router.navigateByUrl(this.backUrl);
    }
}