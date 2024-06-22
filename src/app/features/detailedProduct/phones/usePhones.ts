import { useEffect, useRef } from 'react';

import { useAppSelector, useAppDispatch } from '../../../hooks';
import { AppState } from '../../../store';
import { fetchPhones } from './fetchPhones';
import { selectPhonesInfo } from './selectors';

export const usePhones = <T>(selector: (state: AppState) => T) => {
  const retryCount = useRef(0);
  const phones = useAppSelector(selector);
  const phonesInfo = useAppSelector(selectPhonesInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isValidStatus =
      phonesInfo.status == 'pending' || phonesInfo.status === 'fulfilled';

    const isValidRetry = retryCount.current < 5;

    if (isValidStatus || !isValidRetry) {
      return;
    }

    retryCount.current++;
    dispatch(fetchPhones());
  }, [phonesInfo.status, dispatch]);

  return {
    ...phonesInfo,
    phones,
  };
};
