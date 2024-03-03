import React from 'react';
import { CartItem } from './CartItem';
import { Product } from './Product';

export interface ContextType {
  products: Product[],
  phones: Product[],
  tablets: Product[],
  accessories: Product[],
  favList: Product[],
  cartList: CartItem[],
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  getNewPathname: (option: string, index: number) => string,
  addRemoveFavList: (product: Product) => void,
  addRemoveCartList: (item: CartItem) => void,
  isLoading: boolean,
}
