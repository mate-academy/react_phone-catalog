import React from 'react';
import './BurgerMenu.scss';

type Props = {
  isMenuOpen: boolean;
  handleMenuOpen: () => void;
  handleMenuClose: () => void;
};

export const BurgerMenu: React.FC<Props> = ({
  isMenuOpen,
  handleMenuOpen,
  handleMenuClose,
}) => {
  return (
    <button
      className="burger-menu"
      onClick={isMenuOpen ? handleMenuClose : handleMenuOpen}
    >
      <img
        className="burger-menu__img"
        src={
          isMenuOpen
            ? './img/icons/CloseMenu.png'
            : './img/icons/BurgerMenu.png'
        }
        alt="Burger Menu"
      />
    </button>
  );
};
