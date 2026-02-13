import { createContext } from 'react';
import { Products } from '../types/Products';
import { Phones } from '../types/Phones';
import { Tablets } from '../types/Tablets';
import { Accessories } from '../types/Accessories';
import { CartItem } from '../utils/cart';

type ProductsContextType = {
  products: Products[];
  phones: Phones[];
  tablets: Tablets[];
  accessories: Accessories[];
  favoritesProducts: string[];
  addedCartProducts: CartItem[];
  onAddProduct: (id: string) => void;
  onDeleteProduct: (id: string) => void;
  onChangeCounter: (action: string, id: string) => void;
  onClearCart: () => void;
  onToggleLike: (id: string) => void;
};

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  phones: [],
  tablets: [],
  accessories: [],
  favoritesProducts: [],
  addedCartProducts: [],
  onAddProduct: () => {},
  onDeleteProduct: () => {},
  onChangeCounter: () => {},
  onClearCart: () => {},
  onToggleLike: () => {},
});
