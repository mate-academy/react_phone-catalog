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
    <div
      className="burger-menu"
      onClick={() => (isOpen ? handleClose() : handleOpen())}
    >
      <a href="#burger-menu" className="burger-menu__link">
        <img
          src={
            isOpen
              ? '../../../img/close-button.svg'
              : '../../../img/burger-menu.svg '
          }
          alt="Burger menu"
          className="burger-menu__image"
        />
      </a>
    </div>
  );
};
