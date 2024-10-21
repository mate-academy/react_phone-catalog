import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  burgerMenu: boolean;
  setBurgerMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BurgerMenu: React.FC<Props> = ({ burgerMenu, setBurgerMenu }) => {
  const location = useLocation();

  return (
    <div className="burger-menu">
      <div className="burger-menu--text">
        <Link
          className="burger-menu--text-button"
          onClick={() => setBurgerMenu(!burgerMenu)}
          to="/"
        >
          HOME
        </Link>

        <Link
          className="burger-menu--text-button"
          onClick={() => setBurgerMenu(!burgerMenu)}
          to="/phones"
        >
          PHONES
        </Link>

        <Link
          className="burger-menu--text-button"
          onClick={() => setBurgerMenu(!burgerMenu)}
          to="/tablets"
        >
          TABLETS
        </Link>

        <Link
          className="burger-menu--text-button"
          onClick={() => setBurgerMenu(!burgerMenu)}
          to="/accessories"
        >
          ACCESSORIES
        </Link>
      </div>

      <div className="burger-menu--button">
        <Link onClick={() => setBurgerMenu(!burgerMenu)} to="/favourites">
          <img src="./img/Favourites.svg" alt="Favourites" />
        </Link>
        <Link
          state={{ from: location.pathname }}
          onClick={() => setBurgerMenu(!burgerMenu)}
          to="/cart"
        >
          <img src="./img/Cart.svg" alt="Cart" />
        </Link>
      </div>
    </div>
  );
};
