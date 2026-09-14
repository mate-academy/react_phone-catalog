import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { useOrders } from '../../context/OrdersContext';
import FavouritesHeartLike from '../../../src/images/Favourites(HeartLike).png';
import ShoppingBag from '../../../src/images/Shopping-BagCart.png';
import './Navigations.scss';
export const Navigations: React.FC = () => {
  const { favorites } = useFavorites();

  const { totalCount } = useOrders();

  useEffect(() => {}, [favorites, totalCount]);

  return (
    <nav className="navigation burge-menu__navigation">
      <ul className="navigation__list">
        <li className="navigation__list__item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navigation__list__item--link ${isActive ? 'navigation__list__item--link--active' : ''}`
            }
          >
            Home
          </NavLink>
        </li>
        <li className="navigation__list__item">
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              `navigation__list__item--link ${isActive ? 'navigation__list__item--link--active' : ''}`
            }
          >
            Phones
          </NavLink>
        </li>
        <li className="navigation__list__item">
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              `navigation__list__item--link ${isActive ? 'navigation__list__item--link--active' : ''}`
            }
          >
            tablets
          </NavLink>
        </li>
        <li className="navigation__list__item">
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              `navigation__list__item--link ${isActive ? 'navigation__list__item--link--active' : ''}`
            }
          >
            accessories
          </NavLink>
        </li>
      </ul>
      <div className="shopping-bag">
        <NavLink to="/favorits" className="shopping-bag__link">
          <img
            src={FavouritesHeartLike}
            alt="(HeartLike)"
            className="shopping-bag__link--item"
          />
          {favorites.length > 0 && (
            <div className="shopping-bag__link--count favorites-count">
              {favorites.length}
            </div>
          )}
        </NavLink>
        <NavLink className="shopping-bag__link" to="/orders">
          <img
            src={ShoppingBag}
            alt="(Order)"
            className="shopping-bag__link--item"
          />
          {totalCount > 0 && (
            <div className="shopping-bag__link--count orders-count">
              {totalCount}
            </div>
          )}
        </NavLink>
      </div>
    </nav>
  );
};
