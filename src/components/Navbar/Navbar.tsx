import { NavLink } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import favorite from '../../assets/heart.svg';
import cart from '../../assets/cart.svg';
import './Navbar.scss';

const isLinkActive = ({ isActive }: { isActive: boolean }) => `nav__link${isActive ? ' nav__link--active' : ''}`;

export const Navbar = () => (
  <nav className="nav">
    <ul className="nav__list">
      <li className="nav__item">
        <img src={logo} alt="Site logo" className="nav__logo" />
      </li>

      <li className="nav__item">
        <NavLink className={isLinkActive} to="/">
          Home
        </NavLink>
      </li>

      <li className="nav__item">
        <NavLink className={isLinkActive} to="/phones">
          Phones
        </NavLink>
      </li>

      <li className="nav__item">
        <NavLink className={isLinkActive} to="/tablets">
          Tablets
        </NavLink>
      </li>

      <li className="nav__item">
        <NavLink className={isLinkActive} to="/accessories">
          Accessories
        </NavLink>
      </li>
    </ul>

    <ul className="nav__controls">
      <li className="nav__item">
        <NavLink title="Favorites" className={isLinkActive} to="/favorites">
          <img
            className="nav__icon"
            src={favorite}
            alt="Favorites"
          />
        </NavLink>
      </li>
      <li className="nav__item">
        <NavLink title="Cart" className={isLinkActive} to="/cart">
          <img className="nav__icon" src={cart} alt="Cart" />
        </NavLink>
      </li>
    </ul>
  </nav>
);
