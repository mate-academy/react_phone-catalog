import React, { useState } from 'react';

type StateType = {
  autoPlay: boolean;
  setAutoPlay: (v: boolean) => void;
};

type Props = {
  children: React.ReactNode;
};

export const StateContext = React.createContext<StateType>({
  autoPlay: false,
  setAutoPlay: () => {},
});

export const StateProvider: React.FC<Props> = ({ children }) => {
  const [autoPlay, setAutoPlay] = useState(true);

  const stateTools = {
    autoPlay,
    setAutoPlay,
  };

  return (
    <StateContext.Provider value={stateTools}>{children}</StateContext.Provider>
  );
};
