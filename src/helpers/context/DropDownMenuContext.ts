import { createContext } from 'react';

export const DropDownMenuContext = createContext({
  expandMenu: () => {},
  collapseMenu: () => {},
});
