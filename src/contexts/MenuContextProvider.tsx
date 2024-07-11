import React, { createContext, useState } from 'react';

export interface MenuType {
  isOpen: boolean;
  setIsOpen: (cards: boolean) => void;
}

export const MenuContext = createContext<MenuType>({
  isOpen: false,
  setIsOpen: () => {},
});

export const MenuContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <MenuContext.Provider
      value={{
        isOpen: open,
        setIsOpen: (param: boolean) => setOpen(param),
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
