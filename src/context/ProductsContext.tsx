import { createContext } from 'react';
import { Product } from '../types/Product';
import { CartItem } from '../types/CartItem';

type ProductsContextType = {
  cartProducts: CartItem[];
  favouriteProducts: Product[];
  toggleFavourite(product: Product): void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  changeQuantity: (productId: number, change: 1 | -1) => void;
  products: Product[];
  isLoading: boolean;
  hasError: boolean;
};

export const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);
