import { useLocation, Link } from 'react-router-dom';
import { useCurrentPath } from '../context/PathContext';
import { useContext } from 'react';
import { AddAndFavoritesContext } from '../context/AddAndFavoritesContext';
import cn from 'classnames';

import styles from './BurgerNavigation.module.scss';
import favorite from '../../../public/img/Icons/favoriteIcon.svg';
import bag from '../../../public/img/Icons/bag-Icon.svg';

type Props = {
  isBurgerMenu: boolean;
  onClose: () => void;
};

export const BurgerNavigation: React.FC<Props> = ({
  isBurgerMenu,
  onClose,
}) => {
  const { pathname, search } = useCurrentPath();
  const location = useLocation();
  const context = useContext(AddAndFavoritesContext);
  const { favorites, cart } = context;

  const STORAGE_KEY_LAST_PAGE = 'lastNonCartOrFavPage';

  const pages = [
    { title: 'HOME', path: '/' },
    { title: 'PHONES', path: '/phones' },
    { title: 'TABLETS', path: '/tablets' },
    { title: 'ACCESSORIES', path: '/accessories' },
  ];

  const itemInFavorites = favorites.length;
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const saveLastPage = () => {
    if (
      !location.pathname.startsWith('/cart') &&
      !location.pathname.startsWith('/favorites')
    ) {
      sessionStorage.setItem(
        STORAGE_KEY_LAST_PAGE,
        location.pathname + location.search,
      );
    }
  };

  return (
    <nav
      className={cn(styles.burgerNavigation, {
        [styles.isOpen]: isBurgerMenu,
      })}
    >
      <div className={styles.burgerContainer}>
        <ul className={styles.burgerList}>
          {pages.map(({ title, path }) => (
            <li className={styles.burgerListItem} key={title}>
              <Link
                className={cn(styles.burgerLink, {
                  [styles.isActive]:
                    path === '/' ? pathname === '/' : pathname.startsWith(path),
                })}
                to={{ pathname: path, search }}
                onClick={() => {
                  saveLastPage();
                  onClose();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.burgerFooter}>
          <div
            className={cn(styles.burgerIconContainer, {
              [styles.isActive]: pathname === '/favorites',
            })}
          >
            <Link
              to="/favorites"
              className={styles.burgerFooterLink}
              onClick={() => {
                saveLastPage();
                onClose();
              }}
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

          <div
            className={cn(styles.burgerIconContainer, {
              [styles.isActive]: pathname === '/cart',
            })}
          >
            <Link
              to="/cart"
              className={styles.burgerFooterLink}
              onClick={() => {
                saveLastPage();
                onClose();
              }}
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
