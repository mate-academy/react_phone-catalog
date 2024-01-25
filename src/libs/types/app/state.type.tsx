import { ProductInCartType } from './product-in-cart.interface';
import { ProductType } from './product.interface';

export type StateType = {
  products: ProductType[];
  isLoading: boolean;
  errorMessage: string;
  favorites: ProductType[];
  setFavorites: (v: ProductType[]) => void;
  cart: ProductInCartType[];
  setCart: (v: ProductInCartType[]) => void;
};
