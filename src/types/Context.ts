import { Product } from './Product';

export interface CartContextType {
  cartProducts: Product[];
  setCartProducts: (newProduct: Product[]) => void;
}

export interface FavouriteContextType {
  favouriteProducts: Product[];
  setFavouriteProducts: (newProduct: Product[]) => void;
}
