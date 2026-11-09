import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { CartItem } from '../../../types/CartItem';
import { Product } from '../../../types/Product';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { cartReducer } from './cartReducer';

const STORAGE_KEY = 'cart';

interface CartContextValue {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  isInCart: (id: string) => boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

interface Props {
  children: ReactNode;
}

export const CartProvider = ({ children }: Props) => {
  const [items, dispatch] = useReducer(cartReducer, [], initial =>
    loadFromStorage<CartItem[]>(STORAGE_KEY, initial),
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEY, items);
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
      isInCart: (id: string) => items.some(item => item.id === id),
      addToCart: (product: Product) => dispatch({ type: 'add', product }),
      removeFromCart: (id: string) => dispatch({ type: 'remove', id }),
      increaseQuantity: (id: string) => dispatch({ type: 'increase', id }),
      decreaseQuantity: (id: string) => dispatch({ type: 'decrease', id }),
      clearCart: () => dispatch({ type: 'clear' }),
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}
