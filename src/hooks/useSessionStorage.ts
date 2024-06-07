import { Dispatch, Reducer, useEffect, useReducer } from 'react';

const initializer = <T>(key: string): ((initial: T) => T) => {
  const stored = sessionStorage.getItem(key);

  return <U>(initial: U): U => {
    if (!stored) {
      return initial;
    }

    try {
      return JSON.parse(stored) as U;
    } catch (e) {
      return initial;
    }
  };
};

export const useSessionReducer = <T extends object, A>(
  reducer: Reducer<T, A>,
  initialState: T,
  key: string,
): [T, Dispatch<A>] => {
  const [state, dispatch] = useReducer(reducer, initialState, initializer(key));

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
};
