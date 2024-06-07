import { Details } from './Details';
import { Product } from './Product';

export type Action =
  | { type: 'toggleMenu' }
  | { type: 'setBrandNewModels' }
  | { type: 'setHotPrices' }
  | { type: 'setProducts'; payload: Product[] }
  | { type: 'setPhones'; payload: Product[] }
  | { type: 'setTablets'; payload: Product[] }
  | { type: 'setAccessories'; payload: Product[] }
  | { type: 'addToFavourites'; id: number }
  | { type: 'addToCart'; id: number }
  | { type: 'removeFromCart'; id: number }
  | { type: 'plusOneItem'; id: number }
  | { type: 'minusOneItem'; id: number }
  | { type: 'addSelectedProduct'; payload: Details }
  | { type: 'setIsLoading'; value: boolean }
  | { type: 'clearCart' }
  | { type: 'setCart'; payload: Product[] }
  | { type: 'setFavourites'; payload: Product[] }
  | { type: 'findProduct'; path: string; value: string };
