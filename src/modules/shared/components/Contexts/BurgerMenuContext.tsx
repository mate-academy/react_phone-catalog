import React, { useContext, useEffect, useState } from 'react';

type CloseBurgerMenu = () => void;
type ToggleBurgerMenu = () => void;

type BurgerMenuContextValue = {
  isBurgerMenuOpened: boolean;
  toggleBurgerMenu: ToggleBurgerMenu;
  closeBurgerMenu: CloseBurgerMenu;
};

const BurgerMenuContext = React.createContext<BurgerMenuContextValue | null>(
  null,
);

type Props = React.PropsWithChildren;

export const BurgerMenuProvider = ({ children }: Props) => {
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);

  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpened(isOpened => !isOpened);
  };

  const closeBurgerMenu = () => {
    setIsBurgerMenuOpened(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsBurgerMenuOpened(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const value = {
    isBurgerMenuOpened,
    toggleBurgerMenu,
    closeBurgerMenu,
  };

  return (
    <BurgerMenuContext.Provider value={value}>
      {children}
    </BurgerMenuContext.Provider>
  );
};

export const useBurgerMenu = () => {
  const value = useContext(BurgerMenuContext);

  if (!value) {
    throw new Error('BurgerMenuProvider is missing!!!');
  }

  return value;
};
