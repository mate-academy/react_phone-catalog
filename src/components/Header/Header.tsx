import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import './Header.scss';
import { Search } from '../Search/Search';

const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'header__nav-link', { 'header__is-active': isActive },
);

export const Header = () => {
  const location = useLocation();
  const paths = location.pathname;
  const visualSearch = paths === '/phones'
    || paths === '/accessories'
    || paths === '/tablets'
    || paths === '/favourites';

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to="/">
            <img
              src="img/mine/LOGO.svg"
              alt="Logo"
              className="header__logo_img"
            />
          </Link>
        </div>

        <nav className="header__nav">
          <div className="header__nav-item">
            <NavLink to="/" className={getLinkClass}>
              HOME
            </NavLink>
          </div>

          <div className="header__nav-item">
            <NavLink to="/phones" className={getLinkClass}>
              PHONES
            </NavLink>
          </div>

          <div className="header__nav-item">
            <NavLink to="/tablets" className={getLinkClass}>
              TABLETS
            </NavLink>
          </div>

          <div className="header__nav-item">
            <NavLink to="/accessories" className={getLinkClass}>
              ACCESSORIES
            </NavLink>
          </div>

        </nav>
      </div>

      <div className="header__container">

        {visualSearch && (
          <div className="header__search">
            <Search />
          </div>
        )}

        <div className="header__icons">
          <NavLink to="/favourites" className={getLinkClass}>
            <img
              src="img/mine/icons/Favourites (Heart Like).svg"
              alt="Like"
            />
          </NavLink>
        </div>

        <div className="header__icons">
          <NavLink to="/cart" className={getLinkClass}>
            <img src="img/mine/icons/Shopping bag (Cart).svg" alt="Cart" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};
