import React from 'react';
import { Cart } from './types/Cart';
import { Product } from './types/Product';

type Props = {
  editCartItem: (cartItem: Cart, num: number | null) => void,
  cartList: Cart[];
  favourites: Product[];
  addFavourite: (favoriteItem: Product) => void,
  isLoading: boolean,
};
export const Context = React.createContext<Props>({
  editCartItem: () => {},
  addFavourite: () => {},
  cartList: [],
  favourites: [],
  isLoading: false,
});
