import './header-navigation.scss';
import { Link } from 'react-router-dom';
import { useCurrentPath } from '../contexts/PathContext';
import cn from 'classnames';
import { AddAndFavoritesContext } from '../contexts/AddAndFavoritesContext';
import { useContext } from 'react';
import { useProductFilters } from '../../hooks/useProductFilters';

export const HeaderNavigation: React.FC = () => {
  const { pathname, search } = useCurrentPath();
  const context = useContext(AddAndFavoritesContext);
  const { favorites, cart } = context;
  const { getLastSearch } = useProductFilters();

  const pages = [
    { title: 'HOME', path: '/' },
    { title: 'PHONES', path: '/phones' },
    { title: 'TABLETS', path: '/tablets' },
    { title: 'ACCESSORIES', path: '/accessories' },
  ];

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const itemInFavorites = favorites.length;

  return (
    <nav className="header-navigation">
      <div className="header-container">
        <ul className="header-list">
          {pages.map(({ title, path }) => (
            <li className="header-list-item" key={title}>
              <Link
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={cn('header-link', {
                  'is-active':
                    path === '/' ? pathname === '/' : pathname.startsWith(path),
                })}
                to={
                  path === '/'
                    ? '/'
                    : search
                    ? `${path}${search}`
                    : `${path}${getLastSearch()}`
                }
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="header-actions">
          <div className="header-icon-container">
            <Link
              to="/favorites"
              className={cn('header-actions-link', {
                'is-active': pathname === '/favorites',
              })}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img
                src="img/icons/FavoritesHeartLike.svg"
                alt="Favorites icon"
                className="icon"
              />
              {itemInFavorites > 0 && (
                <div className="quantity-box">
                  <div className="quantity">{itemInFavorites}</div>
                </div>
              )}
            </Link>
          </div>

          <div className="header-icon-container">
            <Link
              to="/cart"
              className={cn('header-actions-link', {
                'is-active': pathname === '/cart',
              })}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img
                src="img/icons/ShoppingBag.svg"
                alt="Shopping Bag icon"
                className="icon"
              />
              {totalQuantity > 0 && (
                <div className="quantity-box">
                  <div className="quantity">{totalQuantity}</div>
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
