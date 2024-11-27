import React from 'react';
import './BurgerMenu.scss';

type Props = {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

export const BurgerMenu: React.FC<Props> = ({
  isOpen,
  handleOpen,
  handleClose,
}) => {
  return (
    <button
      className="burger-menu"
      onClick={() => (isOpen ? handleClose() : handleOpen())}
    >
      <img
        src={
          isOpen
            ? '../../../img/close-button.svg'
            : '../../../img/burger-menu.svg '
        }
        alt="Burger menu"
        className="burger-menu__image"
      />
    </button>
  );
};
