import { useEffect, useRef } from 'react';

import { AppState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectProductsInfo } from './selectors';
import { fetchProducts } from './fetchProducts';

export const useProducts = <T>(selector: (state: AppState) => T) => {
  const retryCount = useRef(0);
  const products = useAppSelector(selector);
  const productsInfo = useAppSelector(selectProductsInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isValidStatus =
      productsInfo.status == 'pending' || productsInfo.status === 'fulfilled';

    const isValidRetry = retryCount.current < 5;

    if (isValidStatus || !isValidRetry) {
      return;
    }

    retryCount.current++;
    dispatch(fetchProducts());
  }, [productsInfo.status, dispatch]);

  return {
    ...productsInfo,
    products,
  };
};
