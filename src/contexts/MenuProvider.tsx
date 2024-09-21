import React, { createContext, useContext, useState, useEffect } from 'react';

interface MenuContextType {
  isOpen: boolean;
  toggleMenu: () => void;
}

type Props = {
  children: React.ReactNode;
};

export const MenuContext = createContext<MenuContextType | undefined>(
  undefined,
);

export const MenuProvider: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    if (window.innerWidth > 640) {
      setIsOpen(!isOpen);
    }

    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  useEffect(() => {
    const body = document.body;

    if (isOpen && window.innerWidth < 640) {
      const scrollY = window.scrollY;

      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.width = '100%';
    } else {
      const scrollY = body.style.top;

      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      body.style.overflowY = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      body.style.overflowY = '';
    };
  }, [isOpen]);

  return (
    <MenuContext.Provider value={{ isOpen, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext);

  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }

  return context;
};
