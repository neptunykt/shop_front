import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "../models/product";

export class ShoppingCart {

  constructor(items: ShoppingCartItem[]) { this.items = items; }
  public items: ShoppingCartItem[];
  public recordCount: number;
  public itemsSum: number;
  public totalPrice: number;
  public itemsPageSum: number;
  public totalPagePrice: number;

  getQuantity(product: Product) {
    const itemFound = this.items.find(x => x.product.id == product.id);
    if (itemFound)
      return itemFound.items;

    return 0;

  }
}