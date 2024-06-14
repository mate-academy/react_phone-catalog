import { useEffect, useRef } from 'react';

import { useAppSelector, useAppDispatch } from '../../../hooks';
import { AppState } from '../../../store';
import { fetchPhones } from './fetchPhones';
import { selectPhonesInfo } from './selectors';

export const useProducts = <T>(selector: (state: AppState) => T) => {
  const retryCount = useRef(0);
  const products = useAppSelector(selector);
  const productsInfo = useAppSelector(selectPhonesInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isValidStatus =
      productsInfo.status == 'pending' || productsInfo.status === 'fulfilled';

    const isValidRetry = retryCount.current < 5;

    if (isValidStatus || !isValidRetry) {
      return;
    }

    retryCount.current++;
    dispatch(fetchPhones());
  }, [productsInfo.status, dispatch]);

  return {
    ...productsInfo,
    products,
  };
};
