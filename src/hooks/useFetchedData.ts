import { useEffect } from 'react';
import { ThunkAction } from '@reduxjs/toolkit';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AppState } from '../app/store';

type BaseThunkAction = ThunkAction<any, AppState, any, any>;

export const useFetchedData = <A extends BaseThunkAction, T>(
  fetchAction: A,
  selector: (data: AppState) => T,
) => {
  const dispatch = useAppDispatch();
  const result = useAppSelector(selector);

  useEffect(() => {
    const promise = dispatch(fetchAction);

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return result;
};
