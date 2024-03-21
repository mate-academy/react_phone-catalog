import { useReducer, useEffect, useContext } from 'react';
import { ProductsContext } from '../store/ProductsContext';
import { Product } from '../types/Product';
import { FetchFuction } from '../types/FetchFunction';

interface State {
  fetchedProducts: Product[];
  loading: boolean;
  error: string;
  isFetched: boolean;
}

type Action =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: Product[] }
  | { type: 'FETCH_FAILURE'; payload: string }
  | { type: 'FETCH_COMPLETE' };

const dataFetchReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        loading: true,
        error: '',
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        fetchedProducts: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'FETCH_COMPLETE':
      return {
        ...state,
        isFetched: true,
      };
    default:
      throw new Error();
  }
};

const useProducts = (fetchFunction: FetchFuction) => {
  const {
    products,
    loading: contextLoading,
    error: contextError,
  } = useContext(ProductsContext);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    fetchedProducts: [],
    loading: false,
    error: '',
    isFetched: false,
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_INIT' });
    if (!contextLoading && products.length > 0) {
      fetchFunction(products)
        .then((data: Product[]) => {
          dispatch({ type: 'FETCH_SUCCESS', payload: data });
        })
        .catch(() => {
          dispatch({
            type: 'FETCH_FAILURE',
            payload: 'Failed to fetch products',
          });
        })
        .finally(() => {
          dispatch({ type: 'FETCH_COMPLETE' });
        });
    }

    if (contextError) {
      dispatch({ type: 'FETCH_FAILURE', payload: 'Failed to fetch products' });
    }
  }, [products, contextLoading, contextError, fetchFunction]);

  return { ...state };
};

export default useProducts;
