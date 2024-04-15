import React, { useMemo, useReducer } from 'react';
import productsApi from '../api/products.json';
import { Product } from '../types/product';
import phonesApi from '../api/phones.json';
import tabletsApi from '../api/tablets.json';
import accessoriesApi from '../api/accessories.json';
import { ProductDetails } from '../types/productDetails';
import { Message } from '../types/Message';

type Action =
  | { type: 'isLoading'; payload: boolean }
  | { type: 'setMessage'; payload: Message };

type ContextProps = {
  products: Product[];
  phonesDetails: ProductDetails[];
  tabletsDetails: ProductDetails[];
  accessoriesDetails: ProductDetails[];
  isLoading: boolean;
  message: Message;
  dispatch: React.Dispatch<Action>;
};

const reducer = (state: ContextProps, action: Action): ContextProps => {
  switch (action.type) {
    case 'setMessage':
      return {
        ...state,
        message: action.payload,
      };

    case 'isLoading':
      return {
        ...state,
        isLoading: action.payload,
      };
  }
};

export const ProductContext = React.createContext<ContextProps>({
  products: [],
  phonesDetails: [],
  tabletsDetails: [],
  accessoriesDetails: [],
  isLoading: false,
  message: Message.none,
  dispatch: () => {},
});

const initialState: ContextProps = {
  products: productsApi,
  phonesDetails: phonesApi,
  tabletsDetails: tabletsApi,
  accessoriesDetails: accessoriesApi,
  isLoading: false,
  message: Message.none,
  dispatch: () => {},
};

type Props = {
  children: React.ReactNode;
};

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    products,
    message,
    isLoading,
    accessoriesDetails,
    phonesDetails,
    tabletsDetails,
  } = state;

  const value = useMemo(
    () => ({
      products,
      phonesDetails,
      tabletsDetails,
      accessoriesDetails,
      isLoading,
      message,
      dispatch,
    }),
    [state, dispatch],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
