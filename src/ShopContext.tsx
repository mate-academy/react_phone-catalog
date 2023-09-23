import React from 'react';
import { ChangeType } from './types/ChangeType';
import { Product } from './types/Product';

type State = {
  cart: Product[],
  favourites: Product[],
  addToCart: (v: string) => void,
  addToFavourites: (v: string) => void,
  removeFromCart: (v: string) => void,
  removeFromFavourites: (v: string) => void,
  changeValueInCart:(t: ChangeType, v: string) => void,
};

const initialState: State = {
  cart: [],
  favourites: [],
  addToCart: () => {},
  addToFavourites: () => {},
  removeFromCart: () => {},
  removeFromFavourites: () => {},
  changeValueInCart: () => {},
};

export const ShopContext = React.createContext(initialState);
