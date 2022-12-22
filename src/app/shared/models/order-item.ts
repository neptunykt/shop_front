import { SafeUrl } from "@angular/platform-browser";
import { Product } from "./product";

export class OrderItem{
id: string;
product: Product;
quantity: number;
shippingId: number;
imageLink: SafeUrl;
}