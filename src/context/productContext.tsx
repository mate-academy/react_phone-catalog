import React, { useEffect, useMemo, useReducer } from 'react';
import { Product } from '../types/product';
import { Message } from '../types/Message';
import { getProducts } from '../utils/fetchProducts';

type Action =
  | { type: 'isLoading'; payload: boolean }
  | { type: 'setMessage'; payload: Message }
  | { type: 'setProducts'; payload: Product[] };

type ContextProps = {
  products: Product[];
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

    case 'setProducts':
      return {
        ...state,
        products: action.payload,
      };
  }
};

export const ProductContext = React.createContext<ContextProps>({
  products: [],
  isLoading: false,
  message: Message.none,
  dispatch: () => {},
});

const initialState: ContextProps = {
  products: [],
  isLoading: false,
  message: Message.none,
  dispatch: () => {},
};

type Props = {
  children: React.ReactNode;
};

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { products, message, isLoading } = state;

  useEffect(() => {
    dispatch({ type: 'isLoading', payload: true });

    getProducts()
      .then(data =>
        dispatch({
          type: 'setProducts',
          payload: data,
        }),
      )
      .finally(() => dispatch({ type: 'isLoading', payload: false }));
  }, []);

  const value = useMemo(
    () => ({
      products,
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
