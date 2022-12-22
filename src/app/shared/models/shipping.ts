import {OrderItem} from './order-item';
export class Shipping {
    id: string;
    name: string;
    datePlaced: Date;
    userId: number;
    order: OrderItem[]
  }