import React, { useEffect, useState } from 'react';

export const GlobalContext = React.createContext({
  isMenuClose: false,
  setIsMenuClose: (value: boolean) => {},
  MOBILE_MAX_WIDTH: 640,
  DESKTOP_MIN_WIDTH: 1200,
});

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }: Props) => {
  const [isMenuClose, setIsMenuClose] = useState(false);

  const MOBILE_MAX_WIDTH = 640;
  const DESKTOP_MIN_WIDTH = 1200;

  useEffect(() => {
    setIsMenuClose(true);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isMenuClose,
        setIsMenuClose,
        MOBILE_MAX_WIDTH,
        DESKTOP_MIN_WIDTH,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
