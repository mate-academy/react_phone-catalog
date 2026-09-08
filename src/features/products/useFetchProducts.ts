import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchProducts,
  selectProducts,
  selectProductsLoading,
  selectProductsError,
} from './productSlice';

export const useFetchProducts = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);
  const hasProducts = products.length > 0;

  useEffect(() => {
    if (!hasProducts && !isLoading) {
      dispatch(fetchProducts());
    }
  }, [dispatch, hasProducts, isLoading]);

  return { products, isLoading, error };
};
