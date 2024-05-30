import React, { useState } from 'react';

type StateType = {
  openBurger: boolean;
  setOpenBurger: (v: boolean) => void;
};

type Props = {
  children: React.ReactNode;
};

export const StateContext = React.createContext<StateType>({
  openBurger: false,
  setOpenBurger: () => {},
});

export const StateProvider: React.FC<Props> = ({ children }) => {
  const [openBurger, setOpenBurger] = useState(false);

  const stateTools = {
    openBurger,
    setOpenBurger,
  };

  return (
    <StateContext.Provider value={stateTools}>{children}</StateContext.Provider>
  );
};
