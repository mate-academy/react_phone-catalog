import { useEffect } from 'react';

import { AppState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectProductsInfo } from './selectors';
import { fetchProducts } from './fetchProducts';

export const useProducts = <T>(selector: (state: AppState) => T) => {
  const products = useAppSelector(selector);
  const productsInfo = useAppSelector(selectProductsInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      productsInfo.status == 'pending' ||
      productsInfo.status === 'fulfilled'
    ) {
      return;
    }

    dispatch(fetchProducts());
  }, [productsInfo.status, dispatch]);

  return {
    ...productsInfo,
    products,
  };
};
