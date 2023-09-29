import { Logo } from '../Logo/Logo';
import { NavLinkMain } from '../NavLinkMain/NavLink';
import './NavBar.scss';

export const NavBar = () => {
  return (
    <nav className="Navbar">
      <ul className="Navbar__list">
        <li className="Navbar__item Navbar__item--logo">
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
