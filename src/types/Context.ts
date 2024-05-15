import { CartItem } from './CartItem';
import { Product } from './Product';

export type InitialContext = {
  shoppingCart: CartItem[];
  favourites: Product[];
  addProductToCart: (newCartProduct: CartItem) => void;
  addProductToFavourites: (product: Product) => void;
  removeProductFromCart: (id: string) => void;
  removeProductFromFavourites: (id: number) => void;
  handleIncrement: (item: CartItem) => void;
  handleDecrement: (item: CartItem) => void;
  handleClearCart: () => void;
  cartLength: () => number;
};
