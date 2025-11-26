import { Link } from 'react-router-dom';
import { useCurrentPath } from '../context/PathContext';
import cn from 'classnames';
import { AddAndFavoritesContext } from '../context/AddAndFavoritesContext';
import { useContext } from 'react';
import { useProductFilters } from '../hooks/useProductFilters';

import styles from './HeaderNavigation.module.scss';

import favorite from '../../../public/img/Icons/favoriteIcon.svg';
import bag from '../../../public/img/Icons/bag-Icon.svg';

export const HeaderNavigation: React.FC = () => {
  const { pathname, search } = useCurrentPath();
  const { favorites, cart } = useContext(AddAndFavoritesContext);
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
    <nav className={styles.headerNavigation}>
      <div className={styles.headerContainer}>
        <ul className={styles.headerList}>
          {pages.map(({ title, path }) => (
            <li className={styles.headerListItem} key={title}>
              <Link
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={cn(styles.headerLink, {
                  [styles.isActive]:
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

        <div className={styles.headerActions}>
          {/* Favorites */}
          <div className={styles.headerIconContainer}>
            <Link
              to="/favorites"
              className={cn(styles.headerActionsLink, {
                [styles.isActive]: pathname === '/favorites',
              })}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                src={favorite}
                alt="Favorites icon"
                className={styles.icon}
              />
              {itemInFavorites > 0 && (
                <div className={styles.quantityBox}>
                  <div className={styles.quantity}>{itemInFavorites}</div>
                </div>
              )}
            </Link>
          </div>

          {/* Cart */}
          <div className={styles.headerIconContainer}>
            <Link
              to="/cart"
              className={cn(styles.headerActionsLink, {
                [styles.isActive]: pathname === '/cart',
              })}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img src={bag} alt="Shopping Bag icon" className={styles.icon} />
              {totalQuantity > 0 && (
                <div className={styles.quantityBox}>
                  <div className={styles.quantity}>{totalQuantity}</div>
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
