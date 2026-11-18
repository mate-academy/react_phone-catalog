import React, { useEffect, useMemo, useReducer } from 'react';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';

type Action =
  | { type: 'add'; payload: Product }
  | { type: 'remove'; payload: number }
  | { type: 'changeQuantity'; payload: { id: number; delta: 1 | -1 } }
  | { type: 'clear' };

type CartContextType = {
  cart: CartItem[];
  dispatch: React.Dispatch<Action>;
};

type Props = {
  children: React.ReactNode;
};

export const CartContext = React.createContext<CartContextType | null>(null);

const handleChangeQuantity = (
  state: CartItem[],
  payload: { id: number; delta: 1 | -1 },
) => {
  return state.map(item =>
    item.id === payload.id
      ? { ...item, quantity: Math.max(1, item.quantity + payload.delta) }
      : item,
  );
};

const reducer = (state: CartItem[], action: Action): CartItem[] => {
  switch (action.type) {
    case 'add':
      if (state.some(item => item.id === action.payload.id)) {
        return state;
      }

      return [
        ...state,
        { id: action.payload.id, quantity: 1, product: action.payload },
      ];
    case 'remove':
      return state.filter(cart => cart.id !== action.payload);
    case 'changeQuantity':
      return handleChangeQuantity(state, action.payload);
    case 'clear':
      return [];

    default:
      return state;
  }
};

const init = (): CartItem[] => {
  try {
    return JSON.parse(localStorage.getItem('cart') ?? '[]');
  } catch (error) {
    return [];
  }
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, [], init);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const value = useMemo(() => ({ cart, dispatch }), [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
