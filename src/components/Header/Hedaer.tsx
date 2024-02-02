import classNames from 'classnames';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Header.scss';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { FavouritesContext } from '../../context/FavouritesContext';
import { Search } from '../Search/Search';

const getLinkClass = ({ isActive }: {
  isActive: boolean }) => classNames('header__nav-link', {
  'is-active': isActive,
});

export const Header = () => {
  const { cartItems } = useContext(CartContext);
  const { favouritesItems } = useContext(FavouritesContext);

  const count = favouritesItems
    .reduce((total, item) => total + item.quantity, 0);

  const totalItemsInCart = cartItems
    .reduce((total, item) => total + item.quantity, 0);

  const { pathname } = useLocation();
  const isCartPage = pathname === '/cart';

  return (
    <header className="header">
      <nav className="header__nav">

        <ul className="header__nav-items">
          <div className="header__nav-left">
            <Link to="/">
              <div className="header__nav-logo" />
            </Link>

            {!isCartPage && (
              <>
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
              </>
            )}
          </div>

          <div className="header__nav-right">
            {pathname === '/phones' && <Search />}
            {pathname === '/tablets' && <Search />}
            {pathname === '/accessories' && <Search />}
            {pathname === '/favourities' && <Search />}

            <NavLink to="/favourites" className="icon icon-fav">
              {count > 0 && (
                <span className="fav-quantity">{count}</span>
              )}
            </NavLink>

            <NavLink to="/cart" className="icon icon-cart">
              {totalItemsInCart > 0 && (
                <span className="cart-quantity">{totalItemsInCart}</span>
              )}
            </NavLink>

          </div>
        </ul>
      </nav>
    </header>
  );
};
