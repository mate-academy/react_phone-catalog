import React, { memo, useEffect, useMemo, useReducer } from 'react';

import { Product } from '../types/Product';

import { getProducts } from '../utils/api';

type State = {
  products: Product[];
  error: string;
  loading: boolean;
};

type Action = {
  type: 'SET_PRODUCTS' | 'SET_ERROR' | 'SET_LOADING';
  payload: Product[] | string | boolean;
};

function productsReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload as Product[],
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload as string,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload as boolean,
      };
    default:
      return state;
  }
}

type ProductsContextType = {
  products: Product[];
  error: string;
  loading: boolean;
};

export const ProductsContext = React.createContext<ProductsContextType>({
  products: [],
  error: '',
  loading: false,
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = memo(({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, {
    products: [],
    error: '',
    loading: true,
  });

  const { products, error, loading } = state;

  useEffect(() => {
    getProducts()
      .then((fetchedProducts: Product[]) => {
        const maxYear = Math.max(
          ...fetchedProducts.map(product => product.year),
        );
        const updatedProducts = fetchedProducts.map(product => {
          if (product.year === maxYear) {
            return {
              ...product,
              price: product.fullPrice || product.price,
              fullPrice: null,
            };
          }

          return product;
        });

        dispatch({ type: 'SET_PRODUCTS', payload: updatedProducts });
      })
      .catch(() => {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch products' });
      })
      .finally(() => {
        dispatch({ type: 'SET_LOADING', payload: false });
      });
  }, []);

  const value = useMemo(
    () => ({
      products,
      error,
      loading,
    }),
    [products, error, loading],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
});
