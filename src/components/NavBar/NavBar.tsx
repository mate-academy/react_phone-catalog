import { NavLinkMain } from '../NavLinkMain/NavLinkMain';
import { Logo } from '../Logo/Logo';
import './NavBar.scss';

export const NavBar = () => {
  return (
    <nav className="NavBar">
      <ul className="NavBar__list">
        <li className="NavBar__item">
          <Logo />
        </li>

        <li className="NavBar__item">
          <NavLinkMain
            type="text"
            to="/"
          >
            Home
          </NavLinkMain>
        </li>

        <li className="NavBar__item">
          <NavLinkMain
            type="text"
            to="phones"
          >
            Phones
          </NavLinkMain>
        </li>

        <li className="NavBar__item">
          <NavLinkMain
            type="text"
            to="tablets"
          >
            Tablets
          </NavLinkMain>
        </li>

        <li className="NavBar__item">
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
