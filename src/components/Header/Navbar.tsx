import { useContext, useState, useEffect } from 'react';
import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { Searchbar } from './Searcbar';
import { WidthContext } from '../context/WidthContext';
import {
  CartProducts,
  FavoritesProducts,
} from '../context/SavedProductsContext';
import { Logo } from '../additional/Logo';

export const Navbar = () => {
  const location = useLocation();
  const width = useContext(WidthContext);
  const showSearcbar
  = location.pathname === '/phones'
  || location.pathname === '/tablets'
  || location.pathname === '/accessories'
  || location.pathname === '/favorites';

  const { favoritesProducts } = useContext(FavoritesProducts);
  const { cartProducts } = useContext(CartProducts);

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  useEffect(() => {
    document.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as Element;
      const menu = target.classList.contains('navbar__menu');
      const hamburger = target.classList.contains('navbar__hamburger');

      if (!menu && !hamburger) {
        setIsOpenMenu(false);
      }
    });
  }, []);

  return (
    <nav className="navbar">
      <input
        type="checkbox"
        aria-label="Toggle menu"
        className="navbar__hamburger"
        checked={isOpenMenu}
        onChange={() => setIsOpenMenu(!isOpenMenu)}
      />
      <span className="navbar__hamburger-item" />
      <span className="navbar__hamburger-item" />
      <span className="navbar__hamburger-item" />

      <Logo />

      <div className="navbar__menu">
        <ul>

          <li>
            <NavLink
              className={classNames('navbar__link', {
                'navbar__link-isActive': location.pathname === '/',
              })}
              to="/home"
              onClick={() => setIsOpenMenu(false)}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/phones"
              className={classNames('navbar__link', {
                'navbar__link-isActive': location.pathname === '/phones',
              })}
              onClick={() => setIsOpenMenu(false)}
            >
              Phones
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/tablets"
              className={classNames('navbar__link', {
                'navbar__link-isActive': location.pathname === '/tablets',
              })}
              onClick={() => setIsOpenMenu(false)}
            >
              Tablets
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/accessories"
              className={classNames('navbar__link', {
                'navbar__link-isActive': location.pathname === '/accessories',
              })}
              onClick={() => setIsOpenMenu(false)}
            >
              Accessories
            </NavLink>
          </li>
        </ul>

        <ul>
          { showSearcbar && (
            <Searchbar
              isHidden={width < 1120}
            />
          )}

          <li>
            <NavLink
              data-after="favorites"
              className={classNames('navbar__button', {
                'navbar__button-isActive': location.pathname === '/favorites',
              })}
              to="/favorites"
              onClick={() => setIsOpenMenu(false)}
            >
              <img
                className="navbar__button-img"
                src="img/icons/favs.png"
                alt="favorite"
              />
              {favoritesProducts.length > 0 && (
                <div className="navbar__count">{favoritesProducts.length}</div>
              )}
            </NavLink>

          </li>

          <li>
            <NavLink
              data-after="cart"
              className={classNames('navbar__button', {
                'navbar__button-isActive': location.pathname === '/cart',
              })}
              to="/cart"
              onClick={() => setIsOpenMenu(false)}
            >
              <img
                className="navbar__button-img"
                src="img/icons/cart.png"
                alt="cart"
              />
              {cartProducts.length > 0 && (
                <div className="navbar__count">{cartProducts.length}</div>
              )}
            </NavLink>

          </li>

        </ul>

      </div>

    </nav>
  );
};
