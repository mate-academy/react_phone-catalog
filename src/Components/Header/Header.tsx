import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.scss';
import { Search } from '../Search/Search';

export const Header = () => {
  const location = useLocation();
  const { pathname } = location;
  const productPages =
    pathname === '/phones' ||
    pathname === '/tablets' ||
    pathname === '/accessories';

  return (
    <div className="header__items">
      <div className="header__items-left">
        <div className="header__logo">
          <img src="./img/Logo.jpg" alt="icon" className="header__icon" />
        </div>

        <nav className="header__links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              classNames('header__link', { 'is-active': isActive })
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              classNames('header__link', { 'is-active': isActive })
            }
          >
            Phones
          </NavLink>
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              classNames('header__link', { 'is-active': isActive })
            }
          >
            Tablets
          </NavLink>
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              classNames('header__link', { 'is-active': isActive })
            }
          >
            Accessories
          </NavLink>
        </nav>
      </div>

      <div className="header__items-right">
        {productPages && <Search />}

        <div className="header__favor">
          <img
            src="./img/Favourites.jpg"
            alt="favourites"
            className="header__favor-icon"
          />
        </div>
        <div className="header__cart">
          <img
            src="./img/Cart.png"
            alt="favourites"
            className="header__cart-icon"
          />
        </div>
      </div>
    </div>
  );
};
