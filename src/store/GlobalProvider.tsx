import React, { useEffect, useReducer } from 'react';
import { Category } from '../types/Category';
import { Product } from '../types/Product';
import { ProductSpecs } from '../types/ProductSpecs';
import { ItemType } from '../types/ItemType';

type Action =
  | { type: 'loadCategories'; payload: Category[] }
  | { type: 'loadProducts'; payload: Product[] }
  | { type: 'selectedProduct'; payload: ProductSpecs }
  | { type: 'loadList'; itemType: ItemType; payload: Product[] }
  | { type: 'addItem'; itemType: ItemType; payload: Product }
  | { type: 'removeItem'; itemType: ItemType; payload: string };

type DispatchContextType = {
  (action: Action): void;
};

interface State {
  categories: Category[];
  products: Product[];
  productSpecs: ProductSpecs[];
  selectedProduct: ProductSpecs | undefined;
  favourites: Product[];
  cart: Product[];
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'loadCategories':
      return {
        ...state,
        categories: action.payload,
      };

    case 'loadProducts':
      return {
        ...state,
        products: action.payload,
      };

    case 'loadList':
      return {
        ...state,
        [action.itemType]: action.payload,
      };

    case 'selectedProduct':
      return {
        ...state,
        selectedProduct: action.payload,
      };

    case 'addItem':
      return {
        ...state,
        [action.itemType]: [...state[action.itemType], action.payload],
      };

    case 'removeItem':
      return {
        ...state,
        [action.itemType]: state[action.itemType].filter(
          item => item.itemId !== action.payload,
        ),
      };

    case 'addItem':
      return {
        ...state,
        [action.itemType]: [
          ...state[action.itemType],
          { ...action.payload, quantity: 1 }, // Set initial quantity to 1
        ],
      };

    default:
      return state;
  }
}

const initialState: State = {
  categories: [],
  products: [],
  productSpecs: [],
  selectedProduct: undefined,
  favourites: [],
  cart: [],
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<DispatchContextType>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadListFromStorage = (itemType: ItemType) => {
    const savedList = localStorage.getItem(itemType);

    if (savedList) {
      dispatch({
        type: 'loadList',
        itemType,
        payload: JSON.parse(savedList),
      });
    }
  };

  useEffect(() => {
    loadListFromStorage('favourites');
    loadListFromStorage('cart');
  }, []);

  const saveListToStorage = (itemType: ItemType, list: Product[]) => {
    if (list.length > 0) {
      localStorage.setItem(itemType, JSON.stringify(list));
    }
  };

  useEffect(() => {
    saveListToStorage('favourites', state.favourites);
  }, [state.favourites]);

  useEffect(() => {
    saveListToStorage('cart', state.cart);
  }, [state.cart]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
