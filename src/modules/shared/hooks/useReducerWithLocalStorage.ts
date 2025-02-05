import { useEffect, useReducer } from 'react';

type Reducer<State, Action> = (state: State, action: Action) => State;

export const useReducerWithLocalStorage = <State, Action>(
  key: string,
  reducer: Reducer<State, Action>,
  defaultState: State,
): [State, React.Dispatch<Action>] => {
  const storageState = localStorage.getItem(key);
  const initialState: State = storageState
    ? JSON.parse(storageState)
    : defaultState;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch];
};
