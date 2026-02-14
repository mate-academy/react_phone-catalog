import React, { useState } from 'react';

type HeaderContextType = {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HeaderContext = React.createContext<HeaderContextType>({
  menuOpen: false,
  setMenuOpen: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const HeaderProvider: React.FC<Props> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <HeaderContext.Provider value={{ menuOpen, setMenuOpen }}>{children}</HeaderContext.Provider>
  );
};
