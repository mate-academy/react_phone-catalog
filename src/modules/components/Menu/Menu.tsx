import { Link, useLocation } from 'react-router-dom';
import styles from './Menu.module.scss';
import favourite from '../../../img/icons/favourite-button.svg';
import shoppingBag from '../../../img/icons/shopping-bag.svg';
import { useEffect } from 'react';
import { useFavourites } from '../../../Context/FavoriteContext';
import { useCart } from '../../../Context/CartContext';

type Props = {
  isOpen: boolean;
  closeMenu: () => void;
};

export const Menu: React.FC<Props> = ({ isOpen, closeMenu }) => {
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
    <div className={`${styles.menu} ${isOpen ? styles['menu--open'] : ''}`}>
      <ul className={styles.menu__navigation}>
        <li className={styles.menu__navigation__item}>
          <Link
            to="/home"
            className={`${styles.menu__navigation__link} ${pathname === 'home' || pathname === '' ? styles['menu__navigation__link--active'] : ''}`}
            onClick={() => closeMenu()}
          >
            home
          </Link>
        </li>
        <li className={styles.menu__navigation__item}>
          <Link
            to="/phones"
            className={`${styles.menu__navigation__link} ${pathname.includes('phones') ? styles['menu__navigation__link--active'] : ''}`}
            onClick={() => closeMenu()}
          >
            Phones
          </Link>
        </li>
        <li className={styles.menu__navigation__item}>
          <Link
            to="/tablets"
            className={`${styles.menu__navigation__link} ${pathname.includes('tablets') ? styles['menu__navigation__link--active'] : ''}`}
            onClick={() => closeMenu()}
          >
            tablets
          </Link>
        </li>
        <li className={styles.menu__navigation__item}>
          <Link
            to="accessories"
            className={`${styles.menu__navigation__link} ${pathname.includes('accessories') ? styles['menu__navigation__link--active'] : ''}`}
            onClick={() => closeMenu()}
          >
            accessories
          </Link>
        </li>
      </ul>
      <div className={styles.menu__bottom}>
        <Link
          to="/favourites"
          className={`${styles.menu__bottom__item} ${pathname.includes('favourites') ? styles['menu__bottom__item--active'] : ''}`}
          onClick={() => closeMenu()}
        >
          <img
            className={styles.menu__bottom__img}
            src={favourite}
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
          className={`${styles.menu__bottom__item} ${pathname.includes('cart') ? styles['menu__bottom__item--active'] : ''}`}
          onClick={() => closeMenu()}
        >
          <img
            className={styles.menu__bottom__img}
            src={shoppingBag}
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
