import { useEffect, useReducer } from 'react';
import { ProductPreview } from '../../types';
import { getProducts } from '../../services/productsApi';
import React from 'react';

type ProductsAction =
  | { type: 'load' }
  | { type: 'success'; payload: ProductPreview[] }
  | { type: 'error'; payload: string };

interface State {
  products: ProductPreview[];
  loading: boolean;
  error: string | null;
}

const reducer = (state: State, action: ProductsAction): State => {
  switch (action.type) {
    case 'load':
      return { ...state, loading: true };

    case 'success':
      return { products: action.payload, loading: false, error: null };

    case 'error':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const initalState: State = {
  products: [],
  loading: false,
  error: null,
};

export const ProductsContext = React.createContext(initalState);

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  useEffect(() => {
    const loadProducts = async () => {
      dispatch({ type: 'load' });

      try {
        const data = await getProducts();

        dispatch({ type: 'success', payload: data });
      } catch {
        dispatch({ type: 'error', payload: 'Failed to load products' });
      }
    };

    loadProducts();
  }, []);

  return (
    <ProductsContext.Provider value={state}>
      {children}
    </ProductsContext.Provider>
  );
};
