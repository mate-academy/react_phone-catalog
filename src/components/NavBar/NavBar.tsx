import './NavBar.scss';

import { NavLinkMain } from '../NavLinkMain/NavLinkMain';
import { Logo } from '../Logo/Logo';

export const NavBar = () => {
  return (
    <nav className="Navbar">
      <ul className="Navbar__list">
        <li className="Navbar__item">
          <Logo />
        </li>
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
      </ul>
    </nav>
  );
};
