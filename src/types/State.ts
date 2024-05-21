// State.ts
import { Product } from './Product';
import { CartItem } from './CartItem';
import { FullProductData } from './FullProductData';

export interface State {
  isLoading: boolean;
  products: Product[];
  selectedProduct: FullProductData | null;
  cart: CartItem[];
  favourites: Product[];
  isError: string;
}

export type Action =
  | { type: 'setLoading'; payload: boolean }
  | { type: 'setError'; payload: string }
  | { type: 'setProducts'; payload: Product[] }
  | { type: 'setSelectedProduct'; payload: FullProductData | null }
  | { type: 'setCart'; payload: CartItem[] }
  | { type: 'setFavourites'; payload: Product[] }
  | { type: 'addProductToCart'; payload: CartItem }
  | { type: 'addProductToFavourites'; payload: Product }
  | { type: 'removeProductFromCart'; payload: string }
  | { type: 'removeProductFromFavourites'; payload: number }
  | { type: 'removeSelectedProduct' }
  | { type: 'incrementCartItem'; payload: string }
  | { type: 'decrementCartItem'; payload: string }
  | { type: 'clearCart' };
