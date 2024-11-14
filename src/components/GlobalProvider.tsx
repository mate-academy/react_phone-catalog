import React, { useEffect, useReducer } from 'react';
import { Product } from '../types/Product';
import { ProductItem } from '../types/ProductItem';
import { accessLocalStorage } from '../utils/accessLocalStorage';
import { getProducts } from '../utils/getProducts';
import { LocalAccessKeys } from '../utils/LocalAccessKeys';

type State = {
  showMenu: boolean;
  inDarkMode: boolean;
  products: Product[];
  phones: ProductItem[];
  tablets: ProductItem[];
  accessories: ProductItem[];
  inFavorites: Product[];
  inCart: Product[];
};

type Action =
  | { type: 'setShowMenu'; payload: boolean }
  | { type: 'setInDarkMode'; payload: boolean }
  | { type: 'setProducts'; payload: Product[] }
  | { type: 'setPhones'; payload: ProductItem[] }
  | { type: 'setTablets'; payload: ProductItem[] }
  | { type: 'setAccessories'; payload: ProductItem[] }
  | { type: 'toggleInFavorites'; payload: string }
  | { type: 'toggleInCart'; payload: string }
  | { type: 'setInFavotites'; payload: Product[] }
  | { type: 'setInCart'; payload: Product[] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setShowMenu':
      return { ...state, showMenu: action.payload };

    case 'setInDarkMode':
      return { ...state, inDarkMode: action.payload };

    case 'setProducts':
      return { ...state, products: action.payload };

    case 'setPhones':
      return { ...state, phones: action.payload };

    case 'setTablets':
      return { ...state, tablets: action.payload };

    case 'setAccessories':
      return { ...state, accessories: action.payload };

    case 'toggleInFavorites':
      accessLocalStorage.toggle(
        getProducts.getProductById(state.products, action.payload),
        LocalAccessKeys.favorites,
      );

      return {
        ...state,
        inFavorites: accessLocalStorage.get(LocalAccessKeys.favorites),
      };

    case 'toggleInCart':
      accessLocalStorage.toggle(
        getProducts.getProductById(state.products, action.payload),
        LocalAccessKeys.cart,
      );

      return {
        ...state,
        inCart: accessLocalStorage.get(LocalAccessKeys.cart),
      };

    case 'setInFavotites':
      return { ...state, inFavorites: action.payload };

    case 'setInCart':
      return { ...state, inCart: action.payload };

    default:
      return { ...state };
  }
}

const initialState: State = {
  showMenu: false,
  inDarkMode: false,
  products: [],
  phones: [],
  tablets: [],
  accessories: [],
  inFavorites: [],
  inCart: [],
};

export const StateContext = React.createContext(initialState);

export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: 'setInFavotites',
      payload: accessLocalStorage.get(LocalAccessKeys.favorites),
    });
    dispatch({
      type: 'setInCart',
      payload: accessLocalStorage.get(LocalAccessKeys.cart),
    });
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
