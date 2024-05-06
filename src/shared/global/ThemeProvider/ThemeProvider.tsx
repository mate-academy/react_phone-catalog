import React, { ReactNode } from 'react';
import { useAppSelector } from '../../../app/hook';

type Props = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const theme = useAppSelector(
    (state: { themeSwitcher: { currentTheme: any } }) =>
      state.themeSwitcher.currentTheme,
  );

  return <div className={`theme-${theme}`}>{children}</div>;
};
