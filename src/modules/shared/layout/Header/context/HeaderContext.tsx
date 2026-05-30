import React, { createContext, useState } from 'react';

interface HeaderContextType {
  showNavigation: boolean;
  setShowNavigation: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderContext = createContext<HeaderContextType>({
  showNavigation: false,
  setShowNavigation: () => {},
});

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [showNavigation, setShowNavigation] = useState<boolean>(false);

  return (
    <HeaderContext.Provider value={{ showNavigation, setShowNavigation }}>
      {children}
    </HeaderContext.Provider>
  );
};
