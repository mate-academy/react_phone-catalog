import './NavMobile.scss';
import { MenuXs } from '../../types/menuXS';
import { navigation } from '../../utils/navigation';

import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useFavorites } from '../../../../context/Favorites/FavoritesContext';
import { useCart } from '../../../../context/Cart/CartContext';
import { getLinksClass } from '../../hooks/getLinks';

export const NavMobile = ({ isVisible, onVisible }: MenuXs) => {
  const { favorites } = useFavorites();
  const { cart } = useCart();

  return (
    <nav
      className={classNames('header-nav-mobile', {
        'nav-mobile-visible': isVisible,
      })}
    >
      <ul className="header-nav-mobile-list-navigation">
        {navigation.map(item => (
          <li key={item.id}>
            <NavLink
              to={item.to}
              className={({ isActive }) => item.class({ isActive })}
              onClick={() => {
                onVisible(0);
              }}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <footer className="footer-nav-mobile">
        <NavLink
          to={'/favorites'}
          className={({ isActive }) =>
            classNames(getLinksClass({ isActive }), 'favorite-link')
          }
          onClick={() => {
            onVisible(0);
          }}
        >
          <img src="/img/header/fav.svg" alt="" />
          {favorites.length > 0 && (
            <span className="notifications-counter">{favorites.length}</span>
          )}
        </NavLink>
        <NavLink
          to={'/cart'}
          className={({ isActive }) => getLinksClass({ isActive })}
          onClick={() => {
            onVisible(0);
          }}
        >
          <img src="/img/header/cart.svg" alt="" />
          {cart.length > 0 && (
            <span className="notifications-counter">{cart.length}</span>
          )}
        </NavLink>
      </footer>
    </nav>
  );
};
