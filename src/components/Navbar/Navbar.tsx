import { NavLink } from 'react-router-dom';

import { Logo } from '../UI/Logo';
import favorite from '../../assets/svg/heart.svg';
import cart from '../../assets/svg/cart.svg';
import './Navbar.scss';
import { SearchBar } from '../UI/SearchBar/SearchBar';

const isLinkActive = ({ isActive }: { isActive: boolean }) =>
  `nav__link${isActive ? ' nav__link--active' : ''}`;

type NavbarProps = {
  isSearchBar: boolean;
};

export const Navbar = ({ isSearchBar }: NavbarProps) => {
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
            to="/phones?sort=age&perPage=all"
            title="Phones"
          >
            Phones
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink
            className={isLinkActive}
            to="/tablets?sort=age&perPage=all"
            title="Tablets"
          >
            Tablets
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink
            className={isLinkActive}
            to="/accessories?sort=age&perPage=all"
            title="Accessories"
          >
            Accessories
          </NavLink>
        </li>
      </ul>

      <ul className="nav__list nav__list--no-gap">
        {isSearchBar && (
          <li className="nav__item">
            <SearchBar />
          </li>
        )}

        <li className="nav__item">
          <NavLink className={isLinkActive} to="/favorites" title="Favorites">
            <img className="nav__icon" src={favorite} alt="Favorites" />
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink className={isLinkActive} to="/cart" title="Cart">
            <img className="nav__icon" src={cart} alt="Cart" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
