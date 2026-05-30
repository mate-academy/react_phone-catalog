import { Dispatch } from 'react';
import { Action } from '../../contexts/ProductsContext';

export const setLoadingWithTimeout = (
  dispatch: Dispatch<Action>,
  timeoutDuration: number,
) => {
  dispatch({ type: 'SET_LOADING', payload: true });

  setTimeout(() => {
    dispatch({ type: 'SET_LOADING', payload: false });
  }, timeoutDuration);
};
