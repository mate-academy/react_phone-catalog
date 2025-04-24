import { useLayoutEffect, useState } from 'react';

export const useTheme = (): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
] => {
  const [theme, setTheme] = useState(
    localStorage.getItem('app-theme') || 'dark',
  );

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  return [theme, setTheme];
};
