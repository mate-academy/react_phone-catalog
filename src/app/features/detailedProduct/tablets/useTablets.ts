import { useEffect, useRef } from 'react';

import { useAppSelector, useAppDispatch } from '../../../hooks';
import { AppState } from '../../../store';
import { fetchTablets } from './fetchTablets';
import { selectTabletsInfo } from './selectors';

export const useTablets = <T>(selector: (state: AppState) => T) => {
  const retryCount = useRef(0);
  const tablets = useAppSelector(selector);
  const tabletsInfo = useAppSelector(selectTabletsInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isValidStatus =
      tabletsInfo.status === 'pending' || tabletsInfo.status === 'fulfilled';

    const isValidRetry = retryCount.current < 5;

    if (isValidStatus || !isValidRetry) {
      return;
    }

    retryCount.current++;
    dispatch(fetchTablets());
  }, [tabletsInfo.status, dispatch]);

  return {
    ...tabletsInfo,
    tablets: tablets,
  };
};
