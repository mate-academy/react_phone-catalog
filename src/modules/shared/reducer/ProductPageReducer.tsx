/* eslint-disable @typescript-eslint/indent */
import { createContext, useReducer } from 'react';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

type State = {
  wasVisited: boolean;
  currentProducts: Product[];
  currentProductsDetails: ProductDetails[];
  loader: boolean;
  error: string;
  alarm: string;
};

const initState = {
  wasVisited: false,
  currentProducts: [],
  currentProductsDetails: [],
  loader: true,
  error: '',
  alarm: '',
};

type Action =
  | { type: 'setCurrentProducts'; payload: Product[] }
  | { type: 'setCurrentProductsDetails'; payload: ProductDetails[] }
  | { type: 'setLoader'; payload: boolean }
  | { type: 'setError'; payload: string }
  | { type: 'setAlarm'; payload: string };

const productsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setCurrentProducts':
      return {
        ...state,
        wasVisited: true,
        currentProducts: action.payload,
      };
    case 'setCurrentProductsDetails':
      return {
        ...state,
        currentProductsDetails: action.payload,
      };
    case 'setLoader':
      return {
        ...state,
        loader: action.payload,
      };
    case 'setError':
      return {
        ...state,
        error: action.payload,
      };
    case 'setAlarm':
      return {
        ...state,
        alarm: action.payload,
      };
    default:
      return state;
  }
};

export const ProductsState = createContext<State>(initState);

export const ProductsDispatch = createContext<React.Dispatch<Action>>(() => {});

export const GlobalProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [productsState, productsDispatch] = useReducer<
    React.Reducer<State, Action>
  >(productsReducer, initState);

  return (
    <ProductsDispatch.Provider value={productsDispatch}>
      <ProductsState.Provider value={productsState}>
        {children}
      </ProductsState.Provider>
    </ProductsDispatch.Provider>
  );
};
