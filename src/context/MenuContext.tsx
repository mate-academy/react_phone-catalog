/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useState } from 'react';

const MenuContext = createContext(false);
const SetMenuContext = createContext((v: boolean) => {});

export const useMenu = () => useContext(MenuContext);
export const useSetMenu = () => useContext(SetMenuContext);

type Props = {
  children: React.ReactNode;
};

export const MenuProvider: React.FC<Props> = ({ children }) => {
  const [menu, setMenu] = useState(false);

  return (
    <SetMenuContext.Provider value={setMenu}>
      <MenuContext.Provider value={menu}>{children}</MenuContext.Provider>
    </SetMenuContext.Provider>
  );
};
