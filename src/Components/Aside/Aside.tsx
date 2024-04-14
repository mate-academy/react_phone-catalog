import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './Aside.scss';
import React, { useContext } from 'react';
import { FavoriteContext } from '../../context/FavoriteContext';
import { CartContext } from '../../context/CartContext';

type Props = {
  setIsActive: (value: boolean) => void;
};

export const Aside: React.FC<Props> = ({ setIsActive }) => {
  const { favoritesProducts } = useContext(FavoriteContext);
  const { cartProducts } = useContext(CartContext);
  const favoritesCount = favoritesProducts.length;
  const cartCount = cartProducts.length;

  const activeLink = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar__item', 'aside__item', {
      'navbar__item-active': isActive,
    });

  const activeFavoriet = ({ isActive }: { isActive: boolean }) =>
    classNames('aside__icon', 'icon', 'aside__icon--favourites', {
      'aside__item-active': isActive,
    });

  const activeCard = ({ isActive }: { isActive: boolean }) =>
    classNames('aside__icon', 'icon', 'aside__icon--cart', {
      'aside__item-active': isActive,
    });

  return (
    <aside className="aside">
      <div className="aside__container">
        <nav className="aside__nav">
          <NavLink
            to="/"
            className={activeLink}
            onClick={() => setIsActive(false)}
          >
            home
          </NavLink>
          <NavLink
            to="/phones"
            className={activeLink}
            onClick={() => setIsActive(false)}
          >
            phone
          </NavLink>
          <NavLink
            to="/tablets"
            className={activeLink}
            onClick={() => setIsActive(false)}
          >
            tablets
          </NavLink>
          <NavLink
            to="/accessories"
            className={activeLink}
            onClick={() => setIsActive(false)}
          >
            accessories
          </NavLink>
        </nav>

        <div className="aside__icon-block">
          <NavLink
            to="/favorites"
            className={activeFavoriet}
            aria-label="favourites"
            onClick={() => setIsActive(false)}
          >
            {!!favoritesCount && (
              <div className="aside__icon-favourites-count">
                {favoritesCount}
              </div>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={activeCard}
            aria-label="card"
            onClick={() => setIsActive(false)}
          >
            {!!cartCount && (
              <div className="aside__icon-cart-count">{cartCount}</div>
            )}
          </NavLink>
        </div>
      </div>
    </aside>
  );
};
