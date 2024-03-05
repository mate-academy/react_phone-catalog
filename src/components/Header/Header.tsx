import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import classNames from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('Header__nav-item', {
    'is-active': isActive,
  });

export const Header = () => {
  return (
    <header className="Header">
      <div className="Header__content">
        <nav className="Header__nav">
          <Link to="/" className="Header__nav-logo">
            <img src="/icons/Logo.svg" alt="logo" />
          </Link>
          <NavLink to="/" className={getLinkClass}>
            HOME
          </NavLink>
          <NavLink to="/phones" className={getLinkClass}>
            PHONES
          </NavLink>
          <NavLink to="/tablets" className={getLinkClass}>
            TABLETS
          </NavLink>
          <NavLink to="/accessories" className={getLinkClass}>
            ACCESSORIES
          </NavLink>
        </nav>
        <nav className="Header__desire">
          <div className="Header__desire-itemBox">
            <a href="#/" className="Header__desire-item">
              <img src="/icons/Favourites.svg" alt="favourites" />
            </a>
          </div>
          <div className="Header__desire-itemBox">
            <a href="#/" className="Header__desire-item">
              <img src="/icons/Cart.svg" alt="cart" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};
