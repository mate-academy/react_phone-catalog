import { createContext } from 'react';
import { CartProduct } from '../types/CartProduct';
import { Product } from '../types/Product';

type ContextProps = {
  cart: CartProduct[],
  toggleCart:(product: Product) => void,
  setCart:React.Dispatch<React.SetStateAction<CartProduct[]>>,
  totalCount:() => number,
  totalPrice:() => number,
  updateCount: (id: string, countNum: number) => void,
  deleteItem:(id: string) => void,
};

export const Context = createContext<ContextProps>({
  cart: [],
  toggleCart: () => {},
  setCart: () => [],
  totalCount: () => 0,
  totalPrice: () => 0,
  updateCount: () => {},
  deleteItem: () => {},
});
