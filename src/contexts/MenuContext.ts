import { createContext } from 'react';

type Context = {
  isMenu?: boolean;
  toggleMenu?: () => void;
};

export const MenuContext = createContext<Context>({
  isMenu: false,
  toggleMenu: () => {},
});
