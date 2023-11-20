import { createContext } from 'react';
import { CartProduct } from '../types/CartProduct';
import { Product } from '../types/Product';

type ContextProps = {
  cart: CartProduct[],
  fav: Product[],
  toggleCart:(product: Product) => void,
  toggleFav:(product: Product) => void,
  setCart:React.Dispatch<React.SetStateAction<CartProduct[]>>,
  setFav:React.Dispatch<React.SetStateAction<Product[]>>,
  totalCount:() => number,
  totalPrice:() => number,
  updateCount: (id: string, countNum: number) => void,
  deleteItem:(id: string) => void,
};

export const Context = createContext<ContextProps>({
  cart: [],
  fav: [],
  toggleCart: () => {},
  setFav: () => {},
  toggleFav: () => {},
  setCart: () => [],
  totalCount: () => 0,
  totalPrice: () => 0,
  updateCount: () => {},
  deleteItem: () => {},
});
