import React from 'react';
import { Logo } from '../Logo/Logo';
import { NavLinkMain } from '../NavLinkMain/NavLink';
import './NavBar.scss';

type Props = {
  isCartOpened: boolean;
};

export const NavBar: React.FC<Props> = ({ isCartOpened }) => {
  return (
    <nav className="Navbar">
      <ul className="Navbar__list">
        <li className="Navbar__item Navbar__item--logo">
          <Logo />
        </li>
        {!isCartOpened && (
          <>
            <li className="Navbar__item">
              <NavLinkMain
                type="text"
                to="/"
              >
                Home
              </NavLinkMain>
            </li>
            <li className="Navbar__item">
              <NavLinkMain
                type="text"
                to="phones"
              >
                Phones
              </NavLinkMain>
            </li>
            <li className="Navbar__item">
              <NavLinkMain
                type="text"
                to="tablets"
              >
                Tablets
              </NavLinkMain>
            </li>
            <li className="Navbar__item">
              <NavLinkMain
                type="text"
                to="accessories"
              >
                Accessories
              </NavLinkMain>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
