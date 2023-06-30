import { NavLink, useLocation } from 'react-router-dom';

import { Logo } from '../UI/Logo';
import favorite from '../../assets/svg/heart.svg';
import cart from '../../assets/svg/cart.svg';
import { SearchBar } from '../UI/SearchBar/SearchBar';
import { getClassNameForNavLink } from '../../helpers/stringOperations';
import { NavbarCart } from './NavbarCart';
import './Navbar.scss';
import { useCart } from '../../contexts/cartContext';
import { useFav } from '../../contexts/favContext';

const isLinkActive = getClassNameForNavLink('nav__link');

const searchbarPathnames = [
  '/favorites',
  '/phones',
  '/tablets',
  '/accessories',
];

export const Navbar = () => {
  const { pathname } = useLocation();
  const isSearchBar = searchbarPathnames.includes(pathname);

  const { cartItems } = useCart();
  const { favItems } = useFav();

  if (pathname === '/cart') {
    return <NavbarCart cartCount={cartItems.length} />;
  }

  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Logo />
        </li>

        <li className="nav__item">
          <NavLink className={isLinkActive} to="/home" title="Home">
            Home
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink
            className={isLinkActive}
            to="/phones"
            title="Phones"
          >
            Phones
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink
            className={isLinkActive}
            to="/tablets"
            title="Tablets"
          >
            Tablets
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink
            className={isLinkActive}
            to="/accessories"
            title="Accessories"
          >
            Accessories
          </NavLink>
        </li>
      </ul>

      <ul className="nav__list nav__list--no-gap">
        {isSearchBar && (
          <li className="nav__item">
            <SearchBar key={pathname} />
          </li>
        )}

        <li className="nav__item">
          <NavLink className={getClassNameForNavLink('nav__link', ' nav__link--icon')} to="/favorites" title="Favorites">
            <img className="nav__icon" src={favorite} alt="Favorites" />
            <span className="nav__count">{favItems.length}</span>
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink className={getClassNameForNavLink('nav__link', ' nav__link--icon')} to="/cart" title="Cart">
            <img className="nav__icon" src={cart} alt="Cart" />
            <span className="nav__count">{cartItems.length}</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
