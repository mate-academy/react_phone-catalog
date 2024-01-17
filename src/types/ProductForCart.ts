import { Product } from './Product';

export interface ProductForCart {
  id: string;
  quantity: number;
  product: Product;
}

export interface CartAction {
  type: 'ADD_TO_CART' | 'REMOVE_FROM_CART' | 'UPDATE_QUANTITY';
  payload: ProductForCart;
}

export interface CartState {
  cart: ProductForCart[];
}

export type CartContextType = {
  cart: ProductForCart[];
  handleAddToCart: (product: ProductForCart) => void;
  handleRemoveFromCart: (product: ProductForCart) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
};
