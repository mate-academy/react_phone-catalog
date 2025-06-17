import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import classNames from 'classnames';
import { useFavourites } from '@context/FavoriteContext';
import { useCart } from '@context/CartContext';
import favourite from '@img/icons/favourite-button.svg';
import favouriteBlack from '@img/icons/favourite-button-black.svg';
import shoppingBag from '@img/icons/shopping-bag.svg';
import shoppingBagBlack from '@img/icons/shopping-bag-black.svg';
import styles from './Menu.module.scss';

type Props = {
  isOpen: boolean;
  closeMenu: () => void;
  isLightMode: boolean;
};

export const Menu: React.FC<Props> = ({ isOpen, closeMenu, isLightMode }) => {
  const location = useLocation();
  const pathname = location.pathname.replace(/^\//, '');
  const { favourites } = useFavourites();
  const { cartProducts } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div
      className={classNames(styles.menu, {
        [styles['menu--open']]: isOpen,
      })}
    >
      <ul className={styles.menu__navigation}>
        <li className={styles.menu__navigation__item}>
          <Link
            to="/home"
            className={classNames(styles.menu__navigation__link, {
              [styles['menu__navigation__link--active']]:
                pathname === 'home' || pathname === '',
            })}
            onClick={() => closeMenu()}
          >
            home
          </Link>
        </li>
        <li className={styles.menu__navigation__item}>
          <Link
            to="/phones"
            className={classNames(styles.menu__navigation__link, {
              [styles['menu__navigation__link--active']]:
                pathname.includes('phones'),
            })}
            onClick={() => closeMenu()}
          >
            Phones
          </Link>
        </li>
        <li className={styles.menu__navigation__item}>
          <Link
            to="/tablets"
            className={classNames(styles.menu__navigation__link, {
              [styles['menu__navigation__link--active']]:
                pathname.includes('tablets'),
            })}
            onClick={() => closeMenu()}
          >
            tablets
          </Link>
        </li>
        <li className={styles.menu__navigation__item}>
          <Link
            to="accessories"
            className={classNames(styles.menu__navigation__link, {
              [styles['menu__navigation__link--active']]:
                pathname === 'accessories',
            })}
            onClick={() => closeMenu()}
          >
            accessories
          </Link>
        </li>
      </ul>
      <div className={styles.menu__bottom}>
        <Link
          to="/favourites"
          className={classNames(styles.menu__bottom__item, {
            [styles['menu__bottom__item--active']]:
              pathname.includes('favourites'),
          })}
          onClick={() => closeMenu()}
        >
          <img
            className={styles.menu__bottom__img}
            src={!isLightMode ? favourite : favouriteBlack}
            alt="Favourite-icon"
          />
          {favourites.length > 0 && (
            <div className={styles['menu__bottom__item--storage']}>
              <span className={styles['menu__bottom__item--text']}>
                {favourites.length}
              </span>
            </div>
          )}
        </Link>
        <Link
          to="/cart"
          className={classNames(styles.menu__bottom__item, {
            [styles['menu__bottom__item--active']]: pathname.includes('cart'),
          })}
          onClick={() => closeMenu()}
        >
          <img
            className={styles.menu__bottom__img}
            src={!isLightMode ? shoppingBag : shoppingBagBlack}
            alt="Shopping-bag-icon"
          />
          {cartProducts.length > 0 && (
            <div className={styles['menu__bottom__item--storage']}>
              <span className={styles['menu__bottom__item--text']}>
                {cartProducts.length}
              </span>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};
