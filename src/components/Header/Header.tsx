import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  burgerMenu: boolean;
  setBurgerMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header: React.FC<Props> = ({ burgerMenu, setBurgerMenu }) => {
  return (
    <header>
      <div className="nav">
        <Link to="/">
          <img className="nav__logo" src="/img/Logo.png" alt="Logo" />
        </Link>
        <img
          onClick={() => setBurgerMenu(!burgerMenu)}
          className="nav__menu"
          src="/img/Menu.png"
          alt="Menu"
        />
      </div>
    </header>
  );
};
