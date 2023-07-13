import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import { Product } from '@typings/product';
import { requestProducts } from '@helpers/requests';

export type ProductsMap = {
  phones: Product[];
  tablets: Product[];
  accessories: Product[];
};

type ContextValue = {
  products: ProductsMap;
  isLoading: boolean;
  error: string;
};

type State = {
  products: ProductsMap;
  isLoading: boolean;
  error: string;
};

type Action =
  | { type: 'loading' }
  | { type: 'products/loaded'; payload: ProductsMap }
  | { type: 'failed'; payload: string };

const ProductsContext = createContext<ContextValue | undefined>(undefined);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'products/loaded':
      return { ...state, isLoading: false, products: action.payload };
    case 'failed':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

const initialState = {
  products: { phones: [], tablets: [], accessories: [] },
  isLoading: false,
  error: '',
};

export const ProductsProvider = ({
  children,
}: React.PropsWithChildren<React.ReactNode>) => {
  const [{ products, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    dispatch({ type: 'loading' });
    requestProducts()
      .then(data => {
        const productsMap = data.reduce(
          (acc: ProductsMap, curr: Product): ProductsMap => {
            const key = curr.category as keyof ProductsMap;

            return {
              ...acc,
              [key]: [...acc[key], curr],
            };
          },
          {
            phones: [],
            tablets: [],
            accessories: [],
          },
        );

        dispatch({ type: 'products/loaded', payload: productsMap });
      })
      .catch(err => dispatch({ type: 'failed', payload: err }));
  }, []);

  const value = useMemo(
    () => ({
      products,
      isLoading,
      error,
    }),
    [products, isLoading],
  );

  return (
    <ProductsContext.Provider value={value as ContextValue}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);

  return context as ContextValue;
};
