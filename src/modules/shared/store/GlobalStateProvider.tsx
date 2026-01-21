import { createContext, useReducer, ReactNode, useContext } from 'react';
import { GlobalState } from './types';
import { rootReducer, initialState } from './store';
import { GlobalAction } from './actions';

interface GlobalStateContextValue {
  state: GlobalState;
  dispatch: React.Dispatch<GlobalAction>;
}

export const GlobalStateContext = createContext<GlobalStateContextValue | null>(
  null,
);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error('useGlobalState must be used within GlobalStateProvider');
  }

  return context;
};
