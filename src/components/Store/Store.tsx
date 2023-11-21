import React from 'react';
import { useLocalStorageReducer } from '../../helpers/customHooks';
import { State } from '../../types/state';
import { Action } from '../../types/action';

const initialState: State = {
  totalCost: 0,
  cartItems: [],
  favoriteItems: [],
};

export const StateContext = React.createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = React.createContext((_action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useLocalStorageReducer('CartStorage', initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
