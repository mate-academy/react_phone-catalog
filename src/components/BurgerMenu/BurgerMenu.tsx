import React from 'react';
import { Link } from 'react-router-dom';

import './BurgerMenu.scss';

type Props = {
  setOpen: (value: boolean) => void;
};

export const BurgerMenu: React.FC<Props> = ({ setOpen }) => {
  return (
    <div className="burger-menu">
      <nav className="burger-menu__nav">
        <Link
          to="/"
          className="burger-menu__link"
          onClick={() => setOpen(false)}
        >
          HOME
        </Link>
        <Link
          to="#"
          className="burger-menu__link"
          onClick={() => setOpen(false)}
        >
          PHONES
        </Link>
        <Link
          to="#"
          className="burger-menu__link"
          onClick={() => setOpen(false)}
        >
          TABLETS
        </Link>
        <Link
          to="#"
          className="burger-menu__link"
          onClick={() => setOpen(false)}
        >
          ACCESSORIES
        </Link>
      </nav>
      <div className="burger-menu__button">
        <Link to="#" className="burger-menu__button-link">
          <img src="/img/icons/icon-favourites.svg" alt="favourites" />
        </Link>
        <Link to="#" className="burger-menu__button-link">
          <img src="/img/icons/icon-cart.svg" alt="cart" />
        </Link>
      </div>
    </div>
  );
};
