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
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty(
        '--scroll-y',
        `${window.scrollY}px`,
      );
    };

    if (isOpen) {
      handleScroll();
      const scrollY =
        document.documentElement.style.getPropertyValue('--scroll-y');

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;

      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
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
