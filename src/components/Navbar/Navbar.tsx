/* eslint-disable max-len */
import { NavLink } from 'react-router-dom';

import logo from '../../assets/Navbar/logo.svg';
import favorite from '../../assets/Navbar/heart.svg';
import cart from '../../assets/Navbar/cart.svg';
import './Navbar.scss';

const isLinkActive = ({ isActive }: { isActive: boolean }) => `nav__link${isActive ? ' nav__link--active' : ''}`;

export const Navbar = () => (
  <header>
    <nav className="nav">
      <img src={logo} alt="Site logo" className="nav__logo" />

      <ul className="nav__list">
        <li>
          <NavLink className={isLinkActive} to="/">
            Home
          </NavLink>
        </li>

        <li>
          <NavLink className={isLinkActive} to="/phones">
            Phones
          </NavLink>
        </li>

        <li>
          <NavLink className={isLinkActive} to="/tablets">
            Tablets
          </NavLink>
        </li>

        <li>
          <NavLink className={isLinkActive} to="/accessories">
            Accessories
          </NavLink>
        </li>
      </ul>

      <ul className="nav__controls">
        <li className="nav__item">
          <NavLink className={isLinkActive} to="/favorites">
            <img
              className="nav__icon"
              src={favorite}
              alt="Favorite icon button"
            />
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className={isLinkActive} to="/cart">
            <img className="nav__icon" src={cart} alt="Cart icon button" />
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);
