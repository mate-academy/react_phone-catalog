import { Link, NavLink, useLocation } from 'react-router-dom';

import { SearchInput } from '../SearchInput/SearchInput';
import logo from '../../assets/logo.svg';
import favorite from '../../assets/heart.svg';
import cart from '../../assets/cart.svg';
import './Navbar.scss';

const isLinkActive = ({ isActive }: { isActive: boolean }) => `nav__link${isActive ? ' nav__link--active' : ''}`;

export const Navbar = () => {
  const { pathname } = useLocation();

  const showSearchInput = (): boolean => {
    switch (pathname) {
      case '/accessories':
        return true;
      case '/phones':
        return true;
      case '/tablets':
        return true;
      case '/favorites':
        return true;
      default:
        return false;
    }
  };

  if (pathname === '/cart') {
    return (
      <nav className="nav">
        <div className="nav__item">
          <Link to="/">
            <img src={logo} alt="Site logo" className="nav__logo" />
          </Link>
        </div>

        <div className="nav__item">
          <NavLink title="Cart" className={isLinkActive} to="/cart">
            <img className="nav__icon" src={cart} alt="Cart" />
          </NavLink>
        </div>
      </nav>
    );
  }

  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Link to="/">
            <img src={logo} alt="Site logo" className="nav__logo" />
          </Link>
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

      <ul className="nav__list nav__list--no-gap">
        {showSearchInput() && (
          <li className="nav__item">
            <SearchInput />
          </li>
        )}
        <li className="nav__item">
          <NavLink title="Favorites" className={isLinkActive} to="/favorites">
            <img className="nav__icon" src={favorite} alt="Favorites" />
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
};
