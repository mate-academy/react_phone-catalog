import React, { createContext, ReactNode, useState } from 'react';

type AppContextType = {
  isMenuActive: boolean;
  setIsMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext<AppContextType>({
  isMenuActive: false,
  setIsMenuActive: () => {},
});

type Props = {
  children: ReactNode;
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  return (
    <AppContext.Provider value={{ isMenuActive, setIsMenuActive }}>
      {children}
    </AppContext.Provider>
  );
};
