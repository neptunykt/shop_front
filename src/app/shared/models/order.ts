import { ShoppingCart } from "./shopping-cart";

export class Order {
  datePlaced: number;
  items: any[];
  constructor(public userId: string, public shipping: any, public shoppingCart: ShoppingCart) {
    this.datePlaced = new Date().getTime();
    this.userId = userId;
    this.items = shoppingCart.items.map(i => {
      return {
        product: {
          id: i.product.id,
          price: i.product.price
        },
        quantity: i.items,
      }
    }
    );
  }
}