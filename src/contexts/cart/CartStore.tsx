import React, { useEffect, useReducer } from 'react';
import { ProductPreview } from '../../types';

interface UpdatePayload {
  id: string;
  changes: Partial<Omit<CartItem, 'id'>>;
}

export type CartItem = {
  product: ProductPreview;
  quantity: number;
};

type Action =
  | { type: 'add'; payload: CartItem }
  | { type: 'remove'; payload: string }
  | { type: 'update'; payload: UpdatePayload }
  | { type: 'clear' };

interface State {
  cartItems: CartItem[];
}

interface CartContextValue extends State {
  totalQuantityDiff: number;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    case 'remove':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem => cartItem.product.id !== action.payload,
        ),
      };

    case 'update':
      return {
        ...state,
        cartItems: state.cartItems.map(cartItem =>
          cartItem.product.id === action.payload.id
            ? { ...cartItem, ...action.payload.changes }
            : cartItem,
        ),
      };

    case 'clear':
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
}

const initialState: State = {
  cartItems: JSON.parse(localStorage.getItem('products') || '[]'),
};

export const CartContext = React.createContext<CartContextValue>({
  ...initialState,
  totalQuantityDiff: 0,
});
export const CartDispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const totalQuantityDiff = React.useMemo(() => {
    const addons = state.cartItems.map(item => item.quantity);

    const calculation =
      addons.reduce((sum, item) => {
        return sum + item;
      }, 0) - state.cartItems.length;

    return calculation;
  }, [state.cartItems]);

  const contextValue = {
    ...state,
    totalQuantityDiff,
  };

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartContext.Provider value={contextValue}>
        {children}
      </CartContext.Provider>
    </CartDispatchContext.Provider>
  );
};
