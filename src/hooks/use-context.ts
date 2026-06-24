import { useContext } from 'react';
import { AppContext } from '../utils/Context';

export function useAppContext() {
  const ctx = useContext(AppContext);

  if (ctx === undefined) {
    throw new Error('Error with AppContext');
  } else {
    return ctx;
  }
}
