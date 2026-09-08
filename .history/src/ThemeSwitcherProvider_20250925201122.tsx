import React, { useState } from "react";

/* eslint-disable max-len */
type ThemeSwitcherContextType = {
  mainColor: string;
  secondaryColor: string;
  setMainColor: (color: string) => void;
};

export const ThemeSwitcherContext =
  React.createContext<ThemeSwitcherContextType>({
    mainColor: '',
    secondaryColor: '',
    setMainColor: () => {},
  });

type Props = {
  children: React.ReactNode;
};

export const ThemeSwitcherProvider: React.FC<Props> = ({ children }) => {
  const [mainColor, setMainColor] = useState('')
  return (
    <ThemeSwitcherContext.Provider value={value}>
      {children}
    </ThemeSwitcherContext.Provider>
  );
};
