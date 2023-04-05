import './Favorites.scss';

import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const Favorites = () => {
  const cartProducts = JSON.parse(localStorage.getItem('orderedItems') || '[]');

  return (
    <ul className="favorites">
      <li className="favorites__card">
        <NavLink to="liked" className={({ isActive }) => classNames('favorites__item', { 'favorites__item--active': isActive })}>
          <img src="Images/Heart--001.svg" className="favorites__img" alt="Liked" />
        </NavLink>
      </li>

      <li className="favorites__card">
        <NavLink to="order" className={({ isActive }) => classNames('favorites__item', { 'favorites__item--active': isActive })}>
          <img src="Images/Order--001.svg" className="favorites__img" alt="Order" />
          {!!cartProducts.length && (
            <p className="favorites__item-count">{cartProducts.length}</p>
          )}
        </NavLink>
      </li>
    </ul>
  );
};
