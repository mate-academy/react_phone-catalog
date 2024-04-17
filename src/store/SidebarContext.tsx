import React, { useState } from 'react';

type ContextType = {
  isOpenSidebar: boolean;
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SidebarContext = React.createContext<ContextType>({
  isOpenSidebar: false,
  setIsOpenSidebar: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const SidebarProvider: React.FC<Props> = ({ children }) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const value = {
    isOpenSidebar,
    setIsOpenSidebar,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
