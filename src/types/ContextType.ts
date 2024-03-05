import React from 'react';
import { Product } from './Product';
import { CartItemType } from './CartItemType';

export interface ContextType {
  products: Product[],
  phones: Product[],
  tablets: Product[],
  accessories: Product[],
  favList: Product[],
  cartList: CartItemType[],
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  getNewPathname: (option: string, index: number) => string,
  addRemoveFavList: (product: Product) => void,
  addRemoveCartList: (item: CartItemType) => void,
  isLoading: boolean,
}
