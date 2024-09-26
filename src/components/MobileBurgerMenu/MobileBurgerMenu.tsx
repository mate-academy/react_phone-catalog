import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './MobileBurgerMenu.module.scss';
import { useLocation } from 'react-router-dom';
import { RoutesPathes } from '../../utils/RoutesPathes';
import { FavoritesContext } from '../../context/FavoritesContext';
import { CartContext } from '../../context/CartContextType';
import { useTranslation } from 'react-i18next';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

export const MobileBurgerMenu: React.FC<Props> = ({ isOpen, handleClose }) => {
  const location = useLocation();
  const cartContext = useContext(CartContext);
  const { favoriteProducts } = useContext(FavoritesContext);
  const cartCount = cartContext 
  ? cartContext.cartItems.reduce((total, item) => total + item.quantity, 0) 
  : 0;
  const { theme } = useContext(FavoritesContext);
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(styles.bodyNoScroll);
    } else {
      document.body.classList.remove(styles.bodyNoScroll);
    }

    return () => {
      document.body.classList.remove(styles.bodyNoScroll);
    };
  }, [isOpen]);

  return (
    <aside
      className={classNames(styles.menu, {
        [styles.menuOpen]: isOpen,
        [styles.dark]: theme === 'dark',
      })}
    >
      <div className={styles.menuTop}>
        <Link
          to={RoutesPathes.HOME}
          className={classNames(styles.logo, {
            [styles.dark]: theme === 'dark',
          })}
        />

        <button
          className={classNames(styles.iconClose, {
            [styles.dark]: theme === 'dark',
          })}
          onClick={handleClose}
        ></button>
      </div>
      <ul className={styles.links}>
        <li>
          <Link
            to={RoutesPathes.HOME}
            className={classNames(styles.link, {
              [styles.selectedLink]: location.pathname === RoutesPathes.HOME,
              [styles.dark]: theme === 'dark',
            })}
            onClick={handleClose}
          >
            {t('home')}
          </Link>
        </li>
        <li>
          <Link
            to={RoutesPathes.PHONES}
            className={classNames(styles.link, {
              [styles.selectedLink]: location.pathname.includes(RoutesPathes.PHONES),
              [styles.dark]: theme === 'dark',
            })}
            onClick={handleClose}
          >
            {t('phones')}
          </Link>
        </li>
        <li>
          <Link
            to={RoutesPathes.TABLETS}
            className={classNames(styles.link, {
              [styles.selectedLink]: location.pathname.includes(RoutesPathes.TABLETS),
              [styles.dark]: theme === 'dark',
            })}
            onClick={handleClose}
          >
            {t('tablets')}
          </Link>
        </li>
        <li>
          <Link
            to={RoutesPathes.ACCESSORIES}
            className={classNames(styles.link, {
              [styles.selectedLink]: location.pathname.includes(RoutesPathes.ACCESSORIES),
              [styles.dark]: theme === 'dark',
            })}
            onClick={handleClose}
          >
            {t('accessories')}
          </Link>
        </li>
      </ul>

      <ul className={styles.icons}>
        <li className={styles.iconItem}>
          <Link
            to={RoutesPathes.FAVOURITES}
            className={classNames(styles.iconLinkHeart, {
              [styles.selected]: location.pathname.includes(RoutesPathes.FAVOURITES),
              [styles.dark]: theme === 'dark',
            })}
            onClick={handleClose}
          >
            {favoriteProducts.length > 0 && (
              <span className={styles.badge}>{favoriteProducts.length}</span>
            )}
          </Link>
        </li>
        <li className={styles.iconItem}>
          <Link
            to={RoutesPathes.CART}
            className={classNames(styles.iconLinkBag, {
              [styles.selected]: location.pathname.includes(RoutesPathes.CART),
              [styles.dark]: theme === 'dark',
            })}
            onClick={handleClose}
          >
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>
        </li>
      </ul>
    </aside>
  );
};
