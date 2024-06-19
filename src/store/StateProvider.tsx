import React, { useState } from 'react';

type StateType = {
  openBurger: boolean;
  setOpenBurger: (v: boolean) => void;
  autoPlay: boolean;
  setAutoPlay: (v: boolean) => void;
};

type Props = {
  children: React.ReactNode;
};

export const StateContext = React.createContext<StateType>({
  openBurger: false,
  setOpenBurger: () => {},
  autoPlay: false,
  setAutoPlay: () => {},
});

export const StateProvider: React.FC<Props> = ({ children }) => {
  const [openBurger, setOpenBurger] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  const stateTools = {
    openBurger,
    setOpenBurger,
    autoPlay,
    setAutoPlay,
  };

  return (
    <StateContext.Provider value={stateTools}>{children}</StateContext.Provider>
  );
};