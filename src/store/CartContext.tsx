import { createContext, useEffect, useReducer } from 'react';
import { Product } from '../types/Product';
import { CartReducer } from './reducers';
import { CartAction } from '../types/Actions';

let initialState: Product[] = [];

try {
  const data = localStorage.getItem('cart');

  if (data !== null) {
    initialState = JSON.parse(data);
  }
} catch {
  throw new Error();
}

export const CartContext = createContext(initialState);
export const DispatchCartContext = createContext<React.Dispatch<CartAction>>(
  () => null,
);

type Props = {
  children: React.ReactNode;
};

export const CartStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  return (
    <DispatchCartContext.Provider value={dispatch}>
      <CartContext.Provider value={state}>{children}</CartContext.Provider>
    </DispatchCartContext.Provider>
  );
};
