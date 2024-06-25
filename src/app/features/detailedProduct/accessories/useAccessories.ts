import { useEffect, useRef } from 'react';

import { useAppSelector, useAppDispatch } from '../../../hooks';
import { AppState } from '../../../store';
import { fetchAccessories } from './fetchAccessories';
import { selectAccessoriesInfo } from './selectors';

export const useAccessories = <T>(selector: (state: AppState) => T) => {
  const retryCount = useRef(0);
  const accessories = useAppSelector(selector);
  const accessoriesInfo = useAppSelector(selectAccessoriesInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isValidStatus =
      accessoriesInfo.status === 'pending' ||
      accessoriesInfo.status === 'fulfilled';

    const isValidRetry = retryCount.current < 5;

    if (isValidStatus || !isValidRetry) {
      return;
    }

    retryCount.current++;
    dispatch(fetchAccessories());
  }, [accessoriesInfo.status, dispatch]);

  return {
    ...accessoriesInfo,
    accessories,
  };
};
