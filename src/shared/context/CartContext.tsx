import React, { useEffect, useReducer } from 'react';
import { Product } from 'src/types/Product';

export type CartItemType = {
  product: Product;
  quantity: number;
};

interface State {
  items: CartItemType[];
}

type Action =
  | { type: 'add'; payload: Product }
  | { type: 'remove'; payload: string }
  | { type: 'increment'; payload: string }
  | { type: 'decrement'; payload: string }
  | { type: 'CLEAR_CART' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add':
      return {
        items: [...state.items, { product: action.payload, quantity: 1 }],
      };

    case 'remove':
      return {
        items: state.items.filter(
          item => item.product.itemId !== action.payload,
        ),
      };

    case 'increment':
      return {
        items: state.items.map(item =>
          item.product.itemId === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };

    case 'decrement':
      return {
        items: state.items.map(item =>
          item.product.itemId === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      };

    case 'CLEAR_CART':
      return { ...state, items: [] };

    default:
      return state;
  }
}

export const CartContext = React.createContext<{
  items: CartItemType[];
  toggleCartItem: (product: Product) => void;
  removeFromCart: (itemId: string) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  isInCart: (itemId: string) => boolean;
  clearCart: () => void;
} | null>(null);

type Props = {
  children: React.ReactNode;
};

const initialState: State = {
  items: [],
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [{ items }, dispatch] = useReducer(reducer, initialState, () => {
    const saved = localStorage.getItem('cart');

    return saved ? { items: JSON.parse(saved) } : { items: [] };
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const toggleCartItem = (product: Product) => {
    const exists = items.some(item => item.product.itemId === product.itemId);

    if (exists) {
      dispatch({ type: 'remove', payload: product.itemId });
    } else {
      dispatch({ type: 'add', payload: product });
    }
  };

  const removeFromCart = (itemId: string) => {
    dispatch({ type: 'remove', payload: itemId });
  };

  const increaseQuantity = (itemId: string) => {
    dispatch({ type: 'increment', payload: itemId });
  };

  const decreaseQuantity = (itemId: string) => {
    dispatch({ type: 'decrement', payload: itemId });
  };

  const isInCart = (itemId: string) =>
    items.some(item => item.product.itemId === itemId);

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        items,
        toggleCartItem,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        isInCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};
