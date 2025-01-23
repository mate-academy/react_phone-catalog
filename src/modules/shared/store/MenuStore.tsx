import React, { useReducer } from 'react';

type State = boolean;
type DispatchType = (action: Action) => void;
type Action = { type: 'set'; payload: boolean };

const reducer = (state: State, action: Action) => {
  if (action.type === 'set') {
    return action.payload;
  }

  return state;
};

const initialState: State = false;

export const MenuContext = React.createContext<State>(initialState);
export const DispatchMenuContext = React.createContext<DispatchType>(() => {});

type Props = {
  children: React.ReactNode;
};

export const MenuProvide: React.FC<Props> = ({ children }) => {
  const [phones, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchMenuContext.Provider value={dispatch}>
      <MenuContext.Provider value={phones}>{children}</MenuContext.Provider>
    </DispatchMenuContext.Provider>
  );
};
