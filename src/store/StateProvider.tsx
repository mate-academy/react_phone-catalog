import React, { useState } from 'react';

type StateType = {
  openBurger: boolean;
  setOpenBurger: (v: boolean) => void;
  autoPlay: boolean;
  setAutoPlay: (v: boolean) => void;
  count: number;
  setCount: (v: number | ((prevCount: number) => number)) => void;
};

type Props = {
  children: React.ReactNode;
};

export const StateContext = React.createContext<StateType>({
  openBurger: false,
  setOpenBurger: () => {},
  autoPlay: false,
  setAutoPlay: () => {},
  count: 0,
  setCount: () => {},
});

export const StateProvider: React.FC<Props> = ({ children }) => {
  const [openBurger, setOpenBurger] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [count, setCount] = useState(0);

  const stateTools = {
    openBurger,
    setOpenBurger,
    autoPlay,
    setAutoPlay,
    count,
    setCount,
  };

  return (
    <StateContext.Provider value={stateTools}>{children}</StateContext.Provider>
  );
};
