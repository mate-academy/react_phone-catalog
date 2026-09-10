import { useCallback, useEffect, useReducer } from 'react';
import {
  productsInitialState,
  productsReducer,
} from '../reducers/productsReducer';
import { getProducts } from '@/api/api';

export const useProducts = () => {
  const [productsState, productsDispatch] = useReducer(
    productsReducer,
    productsInitialState,
  );

  const fetchProducts = useCallback(async () => {
    try {
      productsDispatch({ type: 'FETCH_START' });

      const productsResponse = await getProducts();

      productsDispatch({ type: 'FETCH_SUCCESS', payload: productsResponse });
    } catch {
      productsDispatch({ type: 'FETCH_ERROR' });
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { ...productsState, retryFetch: fetchProducts };
};
