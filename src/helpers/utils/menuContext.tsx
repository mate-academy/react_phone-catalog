import React, { ReactNode, useState } from 'react';

type ContextValue = {
  hasMenu: boolean;
  setHasMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MenuContext = React.createContext<ContextValue>({
  hasMenu: false,
  setHasMenu: () => {},
});

type Props = {
  children: ReactNode;
};

export const MenuContextProvider: React.FC<Props> = ({ children }) => {
  const [hasMenu, setHasMenu] = useState(true);

  const value = { hasMenu, setHasMenu };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
