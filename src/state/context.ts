import { createContext } from 'react';
import { Action, State } from './state';

type ContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export const StateContext = createContext<ContextType | undefined>(undefined);
