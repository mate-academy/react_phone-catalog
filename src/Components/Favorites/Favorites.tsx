import './Favorites.scss';

import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useLocaleStorage } from '../../Helpers/LocaleStorage';

export const Favorites = () => {
  // const cartProducts = JSON.parse(localStorage.getItem('orderedItems') || '[]');
  const [
    orderedProducts,
  ] = useLocaleStorage('orderedItems', []);

  const [favoritesProducts] = useLocaleStorage('favoritesItems', []);

  return (
    <ul className="favorites">
      <li className="favorites__card">
        <NavLink
          to="favorites"
          className={
            ({ isActive }) => classNames(
              'favorites__item',
              { 'favorites__item--active': isActive },
            )
          }
        >
          <img
            src="Images/Heart--001.svg"
            className="favorites__img"
            alt="Liked"
          />

          {!!favoritesProducts.length && (
            <p className="favorites__item-count">{favoritesProducts.length}</p>
          )}
        </NavLink>
      </li>

      <li className="favorites__card">
        <NavLink
          to="cart"
          className={
            ({ isActive }) => classNames(
              'favorites__item',
              { 'favorites__item--active': isActive },
            )
          }
        >
          <img
            src="Images/Order--001.svg"
            className="favorites__img"
            alt="Order"
          />

          {!!orderedProducts.length && (
            <p className="favorites__item-count">{orderedProducts.length}</p>
          )}
        </NavLink>
      </li>
    </ul>
  );
};
