// const [phones, dispatch] = useReducer(reducer, initialState);

import React, { useEffect, useReducer } from 'react';

function loadPrevState<T>(key: string): T | void {
  const data = localStorage.getItem(key);

  if (!data) {
    return;
  }

  try {
    return JSON.parse(data);
  } catch {
    localStorage.removeItem(key);

    return;
  }
}

export function useLocalStorageReducer<State, Action>(
  key: string,
  reducer: (state: State, action: Action) => State,
  initialState: State,
): [State, React.Dispatch<Action>] {
  const [state, dispatch] = useReducer(
    reducer,
    loadPrevState<State>(key) || initialState,
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch];
}
