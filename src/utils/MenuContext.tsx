/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

export const MenuOpen = React.createContext({
  isMenuOpen: false,
  setIsMenuOpen: (_isMenuOpen: boolean) => {},
});
