import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { CartItem, Product } from '@/shared/types';
import { getStorageData } from '@/utils';

export type CartState = {
  cartItems: CartItem[];
};

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string } // payload productId
  | { type: 'CHANGE_QUANTITY'; payload: { productId: string; count: number } }
  | { type: 'CLEAR_CART' };

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  changeQuantity: (productId: string, delta: number) => void; // delta: +1 или -1
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  totalCartItems: number;
  totalPrice: number;
};

export const initialCartState: CartState = {
  cartItems: getStorageData<CartItem[]>('cart', []),
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.cartItems.some(
        item => item.id === action.payload.id,
      );
      const newCartItem: CartItem = {
        id: action.payload.id,
        quantity: 1,
        product: action.payload,
      };

      if (exists) {
        return state;
      }

      return { ...state, cartItems: [...state.cartItems, newCartItem] };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      };
    }

    case 'CHANGE_QUANTITY': {
      return {
        ...state,
        cartItems: state.cartItems.map(item => {
          if (item.id !== action.payload.productId) {
            return item;
          }

          const newQuantity = Math.max(1, item.quantity + action.payload.count);

          return {
            ...item,
            quantity: newQuantity,
          };
        }),
      };
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        cartItems: [],
      };
    }

    default:
      return state;
  }
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const addToCart = useCallback((product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  }, []);

  const changeQuantity = useCallback((productId: string, count: number) => {
    dispatch({ type: 'CHANGE_QUANTITY', payload: { productId, count } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const isInCart = useCallback(
    (productId: string) => state.cartItems.some(item => item.id === productId),
    [state.cartItems],
  );

  const totalCartItems = useMemo(
    () => state.cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [state.cartItems],
  );

  const totalPrice = useMemo(
    () =>
      state.cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
    [state.cartItems],
  );

  // Правка: value мемоизирован, предотвращает каскадные перерендеры
  const contextValue = useMemo(
    () => ({
      cartItems: state.cartItems,
      addToCart,
      removeFromCart,
      changeQuantity,
      clearCart,
      isInCart,
      totalCartItems,
      totalPrice,
    }),
    [
      state.cartItems,
      addToCart,
      removeFromCart,
      changeQuantity,
      clearCart,
      isInCart,
      totalCartItems,
      totalPrice,
    ],
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartItem must be used within a CartContextProvider');
  }

  return context;
};
