import { useEffect } from 'react';
import { Action, State } from '../context/ContextReducer';

import { useReducer } from 'react';
// import { filterStateForLocalStorage } from '../utils/filterState';

function useLocalStorageReducer(
  key: string,
  reducer: (state: State, action: Action) => State,
  initialState: State,
): [State, React.Dispatch<Action>] {
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialState;

  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch];
}

export default useLocalStorageReducer;
