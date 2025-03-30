/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useMemo } from 'react';
import { LocalStorageKeys, ThemeModeKeys } from '../modules/shared/Types/types';
import { useLocalStorage } from '../hooks/UseLocalStorageHook';

export const DarkModeContext = createContext({
  isDark: '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setIsDark: (_newMode: ThemeModeKeys) => {},
});

export const DarkModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const query = window?.matchMedia('(prefers-color-scheme: dark)');

  const checkIfDark = () =>
    query.matches ? ThemeModeKeys.isDark : ThemeModeKeys.isLight;

  const [isDark, setIsDark] = useLocalStorage<ThemeModeKeys>(
    LocalStorageKeys.theme,
    checkIfDark(),
  );

  const value = useMemo(() => ({ isDark, setIsDark }), [isDark]);

  const isDarkModeOn = (isDarkMode: boolean) => {
    return isDarkMode
      ? setIsDark(ThemeModeKeys.isDark)
      : setIsDark(ThemeModeKeys.isLight);
  };

  const runColorMode = () => {
    if (!window.matchMedia) {
      return;
    }

    query.addEventListener('change', event => isDarkModeOn(event.matches));
  };

  useEffect(() => {
    runColorMode();

    return () => {
      query.removeEventListener('change', event => isDarkModeOn(event.matches));
    };
  }, []);

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};
