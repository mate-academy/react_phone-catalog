import React from 'react';
import { Product } from '../types/Product';
import { CartDetale } from '../types/CartDetale';

type Props = {
  product: Product[];
  loading: boolean;
  error: boolean;
  favorites: Product[];
  favCount: number;
  handleLike: (product: Product) => void;
  inCart: CartDetale[];
  inCartCount: number;
  handleAddOrDeleteCart: (product: Product) => void;
  isSelectedProduct: (itemId: string, poducts: Product[]) => boolean;
  updateCount: (newCount: number, itemId: string) => void;

};

export const StorContext = React.createContext<Props>({
  product: [],
  loading: false,
  error: false,
  favorites: [],
  favCount: 0,
  handleLike: () => {},
  inCart: [],
  inCartCount: 0,
  handleAddOrDeleteCart: () => {},
  isSelectedProduct: () => false,
  updateCount: () => {},
});
