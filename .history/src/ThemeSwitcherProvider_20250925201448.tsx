import React, { useState } from "react";

/* eslint-disable max-len */
type ThemeSwitcherContextType = {
  mainColor: string;
  secondaryColor: string;
  setMainColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
};

export const ThemeSwitcherContext =
  React.createContext<ThemeSwitcherContextType>({
    mainColor: '',
    secondaryColor: '',
    setMainColor: () => {},
    setSecondaryColor: () => {},
  });

type Props = {
  children: React.ReactNode;
};

typ

export const ThemeSwitcherProvider: React.FC<Props> = ({ children }) => {

  const [mainColor, setMainColor] = useState('#FFFFFF');
  const [secondaryColor, setSecondaryColor] = useState('#0F0F11');

  const switchTheme = (prevColor: string) => {
    setMainColor(currentColor => )
  };

  return (
    <ThemeSwitcherContext.Provider value={value}>
      {children}
    </ThemeSwitcherContext.Provider>
  );
};
