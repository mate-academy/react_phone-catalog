import { createContext, useContext, useEffect, useReducer } from 'react';
import { Product } from '../types/Product';

type State = {
  products: Product[];
  isLoading: boolean;
  error: string | null;
};
type Action =
  | { type: 'SET_PRODUCTS_LOADING' }
  | { type: 'SET_PRODUCTS_SUCCESS'; payload: Product[] }
  | { type: 'SET_PRODUCTS_ERROR'; payload: string };

const ProductsContext = createContext<State>({
  products: [],
  isLoading: false,
  error: null,
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PRODUCTS_LOADING':
      return { ...state, isLoading: true, error: null };

    case 'SET_PRODUCTS_SUCCESS':
      return { ...state, products: action.payload, isLoading: false };

    case 'SET_PRODUCTS_ERROR':
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    dispatch({ type: 'SET_PRODUCTS_LOADING' });
    fetch('./api/products.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }

        return res.json();
      })
      .then((data: Product[]) => {
        dispatch({ type: 'SET_PRODUCTS_SUCCESS', payload: data });
      })
      .catch(() => {
        dispatch({
          type: 'SET_PRODUCTS_ERROR',
          payload: 'Failed to load products',
        });
      });
  }, []);

  return (
    <ProductsContext.Provider value={state}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
