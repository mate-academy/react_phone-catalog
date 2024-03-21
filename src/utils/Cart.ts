import { Item, Store } from './Store';

export type CartItem = Item & {
  quantity: number;
};

export class CartClass extends Store<CartItem> {
  constructor() {
    super('cart');
  }

  plusItem(id: string) {
    const existingItem = this.items.find(i => i.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
      this.save();
      this.notifySubcribers();
    }
  }

  minusItem(id: string) {
    const existingItem = this.items.find(i => i.id === id);

    if (existingItem) {
      existingItem.quantity -= 1;
      this.save();
      this.notifySubcribers();
    }
  }

  getTotalPrice() {
    return this.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
  }

  getTotalQuantity() {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }
}

export const Cart = new CartClass();
