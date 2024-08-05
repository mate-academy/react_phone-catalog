import React, { useReducer } from 'react';
import { Product } from '../shared/components/types/Product';

interface State {
  products: Product[];
  isMenuOpened: boolean;
  minLoadDelay: number;
  cartItems: Product[];
  likedItems: Product[];
  isDarkThemeOn: boolean;
}

type Action =
  | { type: 'setIsMenuOpened'; payload: boolean }
  | { type: 'setProducts'; payload: Product[] }
  | { type: 'setCartItems'; payload: Product[] }
  | { type: 'setLikedItems'; payload: Product[] }
  | { type: 'setIsDarkThemeOn'; payload: boolean };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setIsMenuOpened':
      return {
        ...state,
        isMenuOpened: action.payload,
      };

    case 'setProducts':
      return {
        ...state,
        products: action.payload,
      };
    case 'setCartItems':
      localStorage.setItem('cartItems', JSON.stringify(action.payload));

      return {
        ...state,
        cartItems: action.payload,
      };

    case 'setLikedItems':
      localStorage.setItem('likedItems', JSON.stringify(action.payload));

      return {
        ...state,
        likedItems: action.payload,
      };

    case 'setIsDarkThemeOn':
      return {
        ...state,
        isDarkThemeOn: action.payload,
      };
  }
}

const initialState: State = {
  isMenuOpened: false,
  isDarkThemeOn: true,
  products: [],
  cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),
  likedItems: JSON.parse(localStorage.getItem('likedItems') || '[]'),
  minLoadDelay: 250,
};

export const StateContext = React.createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = React.createContext((_action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
