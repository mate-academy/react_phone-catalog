import React, { useEffect, useReducer } from 'react';
import { AllProducts } from '../types/AllProducts/AllProducts';

export interface Cart {
  id: number;
  quantity: number;
  product: AllProducts;
}

export type Action =
  | { type: 'addCartProduct'; payload: Cart }
  | { type: 'deleteCartProduct'; payload: number };

const reducer = (state: Cart[], action: Action) => {
  switch (action.type) {
    case 'addCartProduct':
      return [...state, action.payload];
    case 'deleteCartProduct':
      return state;
    default:
      return state;
  }
};

const loadStateFromLocalStorage = () => {
  const savedItems = localStorage.getItem('cart');

  if (savedItems) {
    return JSON.parse(savedItems);
  }

  return [];
};

export const CartStateContext = React.createContext<Cart[]>([]);
export const CartDispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

export type Props = {
  children: React.ReactNode;
};

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, loadStateFromLocalStorage());

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};
