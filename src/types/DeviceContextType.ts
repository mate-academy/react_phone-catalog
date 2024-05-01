import { CartProps } from '../components/DeviceContext/DeviceContext';
import { Product } from './product';

export type DeviceContextType = {
  addProductToCart: (newCartProduct: CartProps) => void;
  addProductToFavourites: (product: Product) => void;
  removeProductFromCart: (id: string) => void;
  removeProductFromFavourites: (id: number) => void;
  shoppingCart: CartProps[];
  favourites: Product[];
  handleIncrement: (item: CartProps) => void;
  handleDecrement: (item: CartProps) => void;
  handleClearCart: () => void;
  cartLength: () => number;
};
