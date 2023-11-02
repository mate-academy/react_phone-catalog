import './Nav.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import { Logo } from '../Logo';
import { Search } from '../Search';
import { FavContext } from '../../storage/FavContext';
import { CartContext } from '../../storage/CartContext';

const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'navbar__item', 'navbar__item-after',
  { 'navbar__item--is-active': isActive },
);

const getIconLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'navbar__icon-link', 'navbar__icon-link-after',
  { 'navbar__icon-link--is-active': isActive },
);

const isVisible = ['/phones', '/tablets', '/accessories', '/favourites'];

export const Nav = () => {
  const { favProducts } = useContext(FavContext);
  const { cartItems } = useContext(CartContext);
  const { pathname } = useLocation();

  return (
    <nav
      className="header_navbar navbar"
      data-cy="nav"
      role="navigation"
      aria-label="main navigation"
    >
      <ul className="navbar__left-side">
        <Logo />

        {pathname !== '/cart' && (
          <>
            <NavLink
              to="/"
              className={getLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/phones"
              className={getLinkClass}
            >
              Phones
            </NavLink>

            <NavLink
              to="/tablets"
              className={getLinkClass}
            >
              Tablets
            </NavLink>

            <NavLink
              to="/accessories"
              className={getLinkClass}
            >
              Accessories
            </NavLink>
          </>
        )}
      </ul>

      <ul className="navbar__right-side">
        {isVisible.includes(pathname) && (
          <Search
            key={pathname}
          />
        )}

        {pathname !== '/cart' && (
          <NavLink
            to="/favourites"
            className={getIconLinkClass}
          >
            <div className="navbar__icon-box">
              <div className="navbar__icon-container">
                <ReactSVG
                  src="img/icons/Favourites (Heart Like).svg"
                />

                {favProducts.length > 0 && (
                  <div className="navbar__counter">
                    {favProducts.length}
                  </div>
                )}
              </div>
            </div>
          </NavLink>
        )}

        <NavLink
          to="/cart"
          className={getIconLinkClass}
        >
          <div className="navbar__icon-box">
            <div className="navbar__icon-container">
              <ReactSVG
                src="img/icons/Shopping bag (Cart).svg"
              />

              {cartItems.length > 0 && (
                <div className="navbar__counter">
                  {cartItems.length}
                </div>
              )}
            </div>
          </div>
        </NavLink>
      </ul>
    </nav>
  );
};
