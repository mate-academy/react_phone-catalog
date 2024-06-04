import { useState } from 'react';

const OpenMenu = (): [boolean, () => void, () => void] => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const hideMenu = () => {
    setIsMenuOpen(false);
  };

  const showMenu = () => {
    setIsMenuOpen(true);
  };

  return [isMenuOpen, hideMenu, showMenu];
};

export default OpenMenu;
