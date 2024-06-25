import React, { useState } from 'react';

type StateType = {
  autoPlay: boolean;
  setAutoPlay: (v: boolean) => void;
  activeMenu: boolean;
  setActiveMenu: (v: boolean) => void;
};

type Props = {
  children: React.ReactNode;
};

export const StateContext = React.createContext<StateType>({
  autoPlay: false,
  setAutoPlay: () => {},
  activeMenu: false,
  setActiveMenu: () => {},
});

export const StateProvider: React.FC<Props> = ({ children }) => {
  const [autoPlay, setAutoPlay] = useState(true);
  const [activeMenu, setActiveMenu] = useState(false);

  const stateTools = {
    autoPlay,
    setAutoPlay,
    activeMenu,
    setActiveMenu,
  };

  return (
    <StateContext.Provider value={stateTools}>{children}</StateContext.Provider>
  );
};
