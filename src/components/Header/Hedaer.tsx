import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import './Header.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) => 
  classNames('header__nav-link', {
  'is-active': isActive,
});

export const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <ul className="header__nav-items">
          <div className="header__nav-left">
            <Link to="/">
              <div className="header__nav-logo" />
            </Link>

            <li
              className="header__nav-list"
            >
              <NavLink
                to="/"
                className={getLinkClass}
              >
                Home
              </NavLink>
            </li>

            <li
              className="header__nav-list"
            >
              <NavLink
                to="/phones"
                className={getLinkClass}
              >
                Phones
              </NavLink>
            </li>

            <li
              className="header__nav-list"
            >
              <NavLink
                to="/tablets"
                className={getLinkClass}
              >
                Tablets
              </NavLink>
            </li>

            <li
              className="header__nav-list"
            >
              <NavLink
                to="/accessories"
                className={getLinkClass}
              >
                Accessories
              </NavLink>
            </li>
          </div>

          <div className="header__nav-right">

            <NavLink to="/favourites" className="icon icon-fav" />

            <NavLink to="/cart" className="icon icon-cart" />
          </div>
        </ul>
      </nav>
    </header>
  );
};
