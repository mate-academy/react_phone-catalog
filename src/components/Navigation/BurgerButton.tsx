import React from 'react';

interface Props {
  handleClick?: () => (void);
}

export const BurgerButton: React.FC<Props> = ({ handleClick }) => (
  <button
    type="button"
    className="burger-menu__button"
    onClick={handleClick}
  >
    <img className="burger-menu__icon" src="img/images/burger.svg" alt="burger menu" />
  </button>
);
