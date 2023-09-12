import { Cart } from './Cart';
import { Product } from './Product';

export interface Store {
  products: Product[];
  cart: Cart;
  cartItemsNumber: number;
  changeCart: (key: string, qty: number) => void;
  favouriteIds: string[];
  changeFavourites: (id: string) => void;
}
