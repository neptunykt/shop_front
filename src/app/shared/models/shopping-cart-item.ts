import { Product } from "./product";

export class ShoppingCartItem {
    public product: Product;
    public items: number;

    constructor(product: Product, items: number) {
        this.product = product;
        this.items = items;
    }
}