import React, { useEffect, useReducer } from 'react';
import { CartItemType } from '../types/CartItemType';
import { useLocalStorage } from '../hooks/useLocalStorage';

type CartState = {
  cartItems: CartItemType[];
};

type Action =
  | { type: 'set_cartItems'; payload: CartItemType[] }
  | { type: 'add_cartItem'; payload: CartItemType }
  | { type: 'delete_cartItem'; payload: { id: number } }
  | { type: 'clear_cart' }
  | { type: 'decrease_quantity'; payload: { id: number } }
  | { type: 'increase_quantity'; payload: { id: number } };

const initialState: CartState = {
  cartItems: [],
};

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'set_cartItems':
      return {
        ...state,
        cartItems: action.payload,
      };

    case 'add_cartItem':
      if (state.cartItems.some(cartItem => cartItem.id === action.payload.id)) {
        return state;
      }

      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    case 'delete_cartItem':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem => cartItem.id !== action.payload.id,
        ),
      };

    case 'clear_cart':
      return {
        ...state,
        cartItems: [],
      };

    case 'decrease_quantity':
      return {
        ...state,
        cartItems: state.cartItems.map(cartItem => {
          if (cartItem.id !== action.payload.id) {
            return cartItem;
          }

          const newQuantity = Math.max(1, cartItem.quantity - 1);

          return {
            ...cartItem,
            quantity: newQuantity,
          };
        }),
      };

    case 'increase_quantity':
      return {
        ...state,
        cartItems: state.cartItems.map(cartItem =>
          cartItem.id === action.payload.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      };

    default:
      return state;
  }
}

export const CartStateContext = React.createContext(initialState);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CartDispatchContext = React.createContext((action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [localCartItems, setLocalCartItems] = useLocalStorage<CartItemType[]>(
    'cartItems',
    [],
  );

  const [state, dispatch] = useReducer(reducer, {
    cartItems: localCartItems,
  });

  useEffect(() => {
    setLocalCartItems(state.cartItems);
  }, [state.cartItems, setLocalCartItems]);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};
