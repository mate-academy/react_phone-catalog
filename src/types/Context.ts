import { CartItemType } from './CartItemType';
import { Product } from './Product';

export type Context = {
  isLoading: boolean,
  setIsLoading: (isLoading: boolean) => void,
  favouritesList: Product[],
  setFavouritesList: (list: Product[]) => void,
  cartList: CartItemType[],
  setCartList: (list: CartItemType[]) => void,
  fullListOfProducts: Product[],
  setFullListOfProducts: (list: Product[]) => void,
};
