import React, { useContext, useEffect, useState } from 'react';

type HandleToggleBurgerMenu = () => void;
type HandleCloseBurgerMenu = () => void;

type BurgerMenuContextValue = {
  isBurgerMenuOpened: boolean;
  handleToggleBurgerMenu: HandleToggleBurgerMenu;
  handleCloseBurgerMenu: HandleCloseBurgerMenu;
};

const BurgerMenuContext = React.createContext<BurgerMenuContextValue | null>(
  null,
);

type Props = React.PropsWithChildren;

export const BurgerMenuProvider = ({ children }: Props) => {
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);

  const handleToggleBurgerMenu = () => {
    setIsBurgerMenuOpened(isOpened => !isOpened);
  };

  const handleCloseBurgerMenu = () => {
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
    handleToggleBurgerMenu,
    handleCloseBurgerMenu,
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
