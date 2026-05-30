import React, { createContext, ReactNode, useEffect, useState } from 'react';

type MenuType = {
  isMenuActive: boolean;
  setIsMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MenuContext = createContext<MenuType>({
  isMenuActive: false,
  setIsMenuActive: () => {},
});

type Props = {
  children: ReactNode;
};

export const MenuProvider: React.FC<Props> = ({ children }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  useEffect(() => {
    if (isMenuActive) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isMenuActive]);

  return (
    <MenuContext.Provider value={{ isMenuActive, setIsMenuActive }}>
      {children}
    </MenuContext.Provider>
  );
};
