import { loadProducts } from '@features/productsSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useCallback, useEffect } from 'react';

export const useProductsPreload = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading, isLoaded, error } = useAppSelector(
    state => state.products,
  );

  useEffect(() => {
    if (
      isLoaded ||
      (products.phones.length &&
        products.tablets.length &&
        products.accessories.length)
    ) {
      return;
    }

    if (isLoading) {
      return;
    }

    dispatch(loadProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reload = useCallback(() => dispatch(loadProducts()), [dispatch]);

  return {
    products,
    isLoading,
    isLoaded,
    error,
    reload,
  };
};
