import { Cart } from './types/Cart';

export interface ProductContext {
  cartList: Cart[];
  addItemToCart: (cartItem: Cart) => void;
  favouritesList: string[],
  setFavouritesList: (arg: string[]) => void,
}
