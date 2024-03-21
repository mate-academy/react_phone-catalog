import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import classNames from 'classnames';
import { useCallback, useContext, useEffect, useRef } from 'react';
import {
  DispatchContext,
  StateContext,
  useWindowSize,
} from '../../store/ProductsContext';

export const Header = () => {
  const dispatch = useContext(DispatchContext);
  const { favourites } = useContext(StateContext);
  const headerRef = useRef<HTMLDivElement>(null);
  const size = useWindowSize();

  useEffect(() => {
    if (headerRef.current) {
      const hieght = headerRef.current.getBoundingClientRect().height;

      dispatch({ type: 'hieghtHeader', payload: hieght });
    }
  }, [dispatch, size]);

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

  const getDesireLinkClass = useCallback(
    ({ isActive }: { isActive: boolean }) =>
      classNames('Header__desire-item', {
        'Header__desire-item--active': isActive,
      }),
    [],
  );

  return (
    <header className="Header" ref={headerRef}>
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
        <NavLink to="/favourites" className={getDesireLinkClass}>
          <img src="icons/Favourites.svg" alt="favourites" height="16px" />
          {!!favourites.length && (
            <div className="Header__desire-amount">{favourites.length}</div>
          )}
        </NavLink>

        <a href="#/" className="Header__desire-item">
          <img src="icons/Cart.svg" alt="cart" height="16px" />
        </a>
        <div className="Header__menu">
          <button
            type="button"
            className="Header__menu-item"
            onClick={handleOpenMenu}
          >
            <img src="icons/Menu.svg" alt="cart" />
          </button>
        </div>
      </nav>
    </header>
  );
};
