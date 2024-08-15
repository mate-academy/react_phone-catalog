import React, { useEffect, useMemo, useReducer } from 'react';
import { Product } from '../types/product';
import { Message } from '../types/Message';
import { getProducts } from '../utils/fetchProducts';

type Action =
  | { type: 'setLoading'; payload: boolean }
  | { type: 'setMessage'; payload: Message }
  | { type: 'setProducts'; payload: Product[] }
  | { type: 'setFooterHeight'; payload: number };

type ContextProps = {
  products: Product[];
  isLoading: boolean;
  message: Message;
  footerHeight: number;
  dispatch: React.Dispatch<Action>;
};

const reducer = (state: ContextProps, action: Action): ContextProps => {
  switch (action.type) {
    case 'setMessage':
      return {
        ...state,
        message: action.payload,
      };

    case 'setLoading':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'setProducts':
      return {
        ...state,
        products: action.payload,
      };

    case 'setFooterHeight':
      return {
        ...state,
        footerHeight: action.payload,
      };
  }
};

export const ProductContext = React.createContext<ContextProps>({
  products: [],
  isLoading: false,
  message: Message.none,
  footerHeight: 0,
  dispatch: () => {},
});

const initialState: ContextProps = {
  products: [],
  isLoading: false,
  message: Message.none,
  footerHeight: 0,
  dispatch: () => {},
};

type Props = {
  children: React.ReactNode;
};

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { products, message, isLoading, footerHeight } = state;

  useEffect(() => {
    dispatch({ type: 'setLoading', payload: true });

    getProducts()
      .then(data =>
        dispatch({
          type: 'setProducts',
          payload: data,
        }),
      )
      .finally(() => dispatch({ type: 'setLoading', payload: false }));
  }, []);

  const value = useMemo(
    () => ({
      products,
      isLoading,
      message,
      footerHeight,
      dispatch,
    }),
    [state, dispatch],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
