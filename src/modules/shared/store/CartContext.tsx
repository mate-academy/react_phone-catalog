import React, { useContext, useEffect, useReducer } from 'react';
import { Product } from '../types/Product';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface State {
  cartItems: CartItem[];
}

type Action =
  | { type: 'clearCart' }
  | { type: 'addProduct'; product: Product }
  | { type: 'deleteProduct'; productId: string }
  | { type: 'incrementQuantity'; productId: string }
  | { type: 'decrementQuantity'; productId: string };

function getInitialState() {
  const localData = localStorage.getItem('cartItems');

  return localData ? { cartItems: JSON.parse(localData) } : { cartItems: [] };
}

const initialState: State = getInitialState();

export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);
export const StateContext = React.createContext<State>(initialState);

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'clearCart': {
      return { ...state, cartItems: [] };
    }

    case 'addProduct': {
      const existingItem = state.cartItems.find(
        item => item.product.itemId === action.product.itemId,
      );

      if (existingItem) {
        return state;
      }

      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          { product: action.product, quantity: 1 },
        ],
      };
    }

    case 'deleteProduct': {
      const filteredList = state.cartItems.filter(
        item => item.product.itemId !== action.productId,
      );

      return { ...state, cartItems: filteredList };
    }

    case 'incrementQuantity': {
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.product.itemId === action.productId
            ? { product: item.product, quantity: item.quantity + 1 }
            : item,
        ),
      };
    }

    case 'decrementQuantity': {
      const existingItem = state.cartItems.find(
        item => item.product.itemId === action.productId,
      );

      if (existingItem?.quantity === 1) {
        return {
          ...state,
          cartItems: state.cartItems.filter(
            item => item.product.itemId !== action.productId,
          ),
        };
      }

      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.product.itemId === action.productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      };
    }

    default:
      return state;
  }
}

interface Props {
  children: React.ReactNode;
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useCartState = () => {
  const context = useContext(StateContext);

  if (context === undefined) {
    throw new Error('useCartState must be used within a CartProvider');
  }

  return context;
};

export const useCartDispatch = () => {
  const context = useContext(DispatchContext);

  if (context === undefined) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }

  return context;
};
