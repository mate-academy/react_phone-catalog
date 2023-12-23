import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  useContext, useMemo,
} from 'react';
import classNames from 'classnames';
import { Logo } from './Logo';
import './Navbar.scss';
import { getLinkClass } from '../helpers/getLinkClass';
import { CartContext } from '../context/CardContext';
import { FavouriteContext } from '../context/FavouriteContext';
import { Search } from './Search';

export const Navbar = () => {
  const currentLocation = useLocation();
  const { favouriteProducts } = useContext(FavouriteContext);
  const { productsInCart } = useContext(CartContext);
  const showSearch = [
    '/phones',
    '/favourite',
    '/tablets',
    '/accessories',
  ].includes(currentLocation.pathname);

  const favItemsQuantity = useMemo(() => {
    return favouriteProducts.length;
  }, [favouriteProducts]);

  const cartItemsQuantity = useMemo(() => {
    return productsInCart.reduce((prevValue, currentValue) => {
      return prevValue + currentValue.quantity;
    }, 0);
  }, [productsInCart]);

  return (
    <nav
      data-cy="nav"
      className="navbar-main is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar__container">
        <div className="navbar-brand">
          <Logo />
          <NavLink
            to="/"
            className={getLinkClass}
          >
            <span className="mont">Home</span>
          </NavLink>

          <NavLink
            to="/phones"
            className={getLinkClass}
          >
            <span className="mont">Phones</span>
          </NavLink>
          <NavLink
            to="/tablets"
            className={getLinkClass}
          >
            <span className="mont">Tablets</span>
          </NavLink>
          <NavLink
            to="/accessories"
            className={getLinkClass}
          >
            <span className="mont">Accessories</span>
          </NavLink>
        </div>
        <div className="navbar__right">
          {showSearch && <Search />}
          <Link
            to="/favourite"
            className="favourities__link"
          >
            <div className="navbar-right__block">
              <div className="navbar__icons liked" />
              <div
                className={classNames({
                  'navbar__fav-quantity-none': favItemsQuantity === 0,
                  'navbar__fav-quantity': favItemsQuantity > 0,
                })}
              >
                <span className="navbar__fav-quantity-num">
                  {favItemsQuantity}
                </span>
              </div>
            </div>
          </Link>
          <Link
            to="/cart"
            className="cart__link"
          >
            <div className="navbar-right__block">
              <div className="navbar__icons backet" />
              <div
                className={classNames({
                  'navbar__card-quantity-none': cartItemsQuantity === 0,
                  'navbar__card-quantity': cartItemsQuantity > 0,
                })}
              >
                <span className="navbar__cart-quantity-num">
                  {cartItemsQuantity}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};
