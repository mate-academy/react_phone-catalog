import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import classNames from 'classnames';
import { useCallback, useContext } from 'react';
import { DispatchContext } from '../../store/ProductsContext';

export const Header = () => {
  const dispatch = useContext(DispatchContext);

  const handleOpenMenu = () => {
    dispatch({ type: 'showMenu', payload: true });
  };

  const getLinkClass = useCallback(
    ({ isActive }: { isActive: boolean }) =>
      classNames('Header__nav-link', {
        'Header__nav-link-active': isActive,
      }),
    [],
  );

  return (
    <header className="Header">
      <div className="Header__content">
        <div className="Header__logo">
          <Link to="/">
            <img src="icons/Logo.svg" alt="logo" />
          </Link>
        </div>
        <nav className="Header__nav">
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>
          <NavLink to="/phones" className={getLinkClass}>
            Phones
          </NavLink>
          <NavLink to="/tablets" className={getLinkClass}>
            Tablets
          </NavLink>
          <NavLink to="/accessories" className={getLinkClass}>
            Accessories
          </NavLink>
        </nav>
      </div>

      <nav className="Header__desire">
        <div className="Header__desire-itemBox">
          <a href="#/" className="Header__desire-item">
            <img src="icons/Favourites.svg" alt="favourites" />
          </a>
        </div>
        <div className="Header__desire-itemBox">
          <a href="#/" className="Header__desire-item">
            <img src="icons/Cart.svg" alt="cart" />
          </a>
        </div>
        <div className="Header__menu">
          <a href="#/" className="Header__menu-item" onClick={handleOpenMenu}>
            <img src="icons/Menu.svg" alt="cart" />
          </a>
        </div>
      </nav>
    </header>
  );
};
