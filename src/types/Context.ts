import { CartItem } from './CartItem';
import { Product } from './Product';

export type InitialContext = {
  products: Product[];
  cart: CartItem[];
  favourites: Product[];
  isError: boolean;
  addProductToCart: (newCartProduct: CartItem) => void;
  addProductToFavourites: (product: Product) => void;
  removeProductFromCart: (id: string) => void;
  removeProductFromFavourites: (id: number) => void;
  handleIncrement: (item: CartItem) => void;
  handleDecrement: (item: CartItem) => void;
  handleClearCart: () => void;
};
