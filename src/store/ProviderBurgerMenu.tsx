import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

export interface InitialBurgerContext {
  isOpen: boolean;
  openBurgerMenu: () => void;
  closeBurgerMenu: () => void;
}

export const ContextBurgerMenu =
  React.createContext<InitialBurgerContext | null>(null);

interface Props {
  children: React.ReactNode;
}
export const ProviderBurgerMenu: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    window.scrollTo({ top: 0 });

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const openBurgerMenu = useCallback(() => setOpen(true), []);
  const closeBurgerMenu = useCallback(() => setOpen(false), []);

  const value: InitialBurgerContext = useMemo(
    () => ({
      isOpen: open,
      openBurgerMenu: openBurgerMenu,
      closeBurgerMenu: closeBurgerMenu,
    }),
    [open, openBurgerMenu, closeBurgerMenu],
  );

  return (
    <ContextBurgerMenu.Provider value={value}>
      {children}
    </ContextBurgerMenu.Provider>
  );
};
