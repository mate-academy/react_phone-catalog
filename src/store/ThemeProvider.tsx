import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface State {
  isThemeDark: boolean;
  setIsThemeDark: (v: boolean) => void;
}

const initialState: State = {
  isThemeDark: true,
  setIsThemeDark: () => {},
};

export const ThemeContext = React.createContext(initialState);

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [isThemeDark, setIsThemeDark] = useLocalStorage<boolean>(
    'isThemeDark',
    initialState.isThemeDark,
  );

  const value: State = {
    isThemeDark,
    setIsThemeDark,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
