import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { ProdCard } from '../types/Product';
import { CartContextType } from '../types/CartContextType';
import { addToCart } from '../utils/helpers/productHelpers';

export type CartIt = ProdCard & { qty: number };

export interface CartState {
  cart: CartIt[];
}

type Action =
  | { type: 'decrease'; payload: ProdCard }
  | { type: 'increase'; payload: ProdCard }
  | { type: 'add'; payload: ProdCard }
  | { type: 'remove'; payload: ProdCard }
  | { type: 'init'; payload: CartIt[] }
  | { type: 'submit' };

const reducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        cart: addToCart(state.cart, { ...action.payload, qty: 1 }),
      };

    case 'remove':
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== action.payload.id),
      };

    case 'increase':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item,
        ),
      };

    case 'decrease':
      return {
        ...state,
        cart: state.cart
          .map(item =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty - 1 }
              : item,
          )
          .filter(item => item.qty > 0),
      };

    case 'submit':
      return {
        ...state,
        cart: [],
      };

    case 'init':
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
};

const initCartState: CartState = {
  cart: [],
};

export const DispatchContext = React.createContext((action: Action) => {
  void action;
});
export const CartContext = React.createContext<CartContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initCartState);

  useEffect(() => {
    const savedCart = localStorage.getItem('state.cart');

    if (savedCart) {
      dispatch({
        type: 'init',
        payload: JSON.parse(savedCart),
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('state.cart', JSON.stringify(state.cart));
  }, [state.cart]);

  const getTotalPrice = useCallback(
    (items: CartIt[]) =>
      items.reduce((acc, item) => acc + item.price * item.qty, 0),
    [],
  );

  const getTotalItemPrice = useCallback(
    (item: CartIt) => item.price * item.qty,
    [],
  );

  const getTotalItems = useCallback(
    (items: CartIt[]) => items.reduce((acc, item) => acc + item.qty, 0),
    [],
  );

  const addToCard = useCallback((product: ProdCard) => {
    dispatch({ type: 'add', payload: product });
  }, []);

  const submitCart = () => {
    dispatch({ type: 'submit' });
  };

  const value = useMemo(
    () => ({
      getTotalPrice,
      getTotalItems,
      getTotalItemPrice,
      addToCard,
      submitCart,
      state,
    }),
    [getTotalPrice, getTotalItems, getTotalItemPrice, addToCard, state],
  );

  return (
    <DispatchContext.Provider value={dispatch}>
      <CartContext.Provider value={value}>{children}</CartContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useCart = () => {
  const cart = useContext(CartContext) as CartContextType;

  return cart;
};
