import React, { useState } from 'react';

type StateType = {
  openBurger: boolean;
  setOpenBurger: (v: boolean) => void;
  autoPlay: boolean;
  setAutoPlay: (v: boolean) => void;
  count: number;
  setCount: (v: number | ((prevCount: number) => number)) => void;
  handleNext: () => void;
  handlePrev: () => void;
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
  handleNext: () => {},
  handlePrev: () => {},
});

export const StateProvider: React.FC<Props> = ({ children }) => {
  const [openBurger, setOpenBurger] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [count, setCount] = useState(0);

  function handleNext() {
    if (count < 2) {
      setCount(prevCount => prevCount + 1);
    }
  }

  function handlePrev() {
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
    }
  }

  const stateTools = {
    openBurger,
    setOpenBurger,
    autoPlay,
    setAutoPlay,
    count,
    setCount,
    handleNext,
    handlePrev,
  };

  return (
    <StateContext.Provider value={stateTools}>{children}</StateContext.Provider>
  );
};
