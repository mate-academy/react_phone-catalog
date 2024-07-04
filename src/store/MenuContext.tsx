import React, { useEffect, useMemo, useState } from 'react';
import { useWidth } from '../hooks/useWidth';

type InitialContext = {
  displayMenu: boolean;
  setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialContext: InitialContext = {
  displayMenu: false,
  setDisplayMenu: () => {},
};

export const MenuContext = React.createContext<InitialContext>(initialContext);

type Props = {
  children: React.ReactNode;
};

export const MenuProvider: React.FC<Props> = ({ children }) => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const width = useWidth();

  useEffect(() => {
    if (width >= 640) {
      setDisplayMenu(false);
    }
  }, [width]);

  const value = useMemo(() => {
    return { displayMenu, setDisplayMenu };
  }, [displayMenu, setDisplayMenu]);

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
