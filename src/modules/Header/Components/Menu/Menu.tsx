import React from 'react';
import styles from './Menu.styles.module.scss';
import classNames from 'classnames';
import { Logo } from '../../../../components/Logo';
import { Nav } from '../Nav';
import CloseButton from '../../../../assets/icons/closebutton.svg?react';
import FavoritesHeart from '../../../../assets/icons/favouritesheart.svg?react';
import FavoritesBag from '../../../../assets/icons/shoppingbag.svg?react';
import { NavLink } from 'react-router-dom';
import { useFavorites } from '../../../../context';
import { useCart } from '../../../../context/CartContext';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Menu: React.FC<Props> = ({ isOpen, onClose }) => {
  const { favorites } = useFavorites();
  const { cart } = useCart();

  return (
    <aside
      className={classNames(styles.menu, {
        [styles.open]: isOpen,
      })}
    >
      <div className={styles.top}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>

        <button
          type="button"
          onClick={onClose}
          className={styles.close}
          aria-label="Close menu"
        >
          <CloseButton />
        </button>
      </div>

      <div className={styles.navWrapper}>
        <Nav variant="mobile" onLinkClick={onClose} />
      </div>
      <div className={styles.bottom}>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            classNames(styles.favoritesHeart, {
              [styles.active]: isActive,
            })
          }
          onClick={onClose}
          aria-label="Open favorites"
        >
          <div className={styles.iconWrapper}>
            <FavoritesHeart />
            {favorites.length > 0 && (
              <span className={styles.counter}>{favorites.length}</span>
            )}
          </div>
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            classNames(styles.favoritesBag, {
              [styles.active]: isActive,
            })
          }
          onClick={onClose}
          aria-label="Open Cart"
        >
          <div className={styles.iconWrapper}>
            <FavoritesBag />
            {cart.length > 0 && (
              <span className={styles.counter}>
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </div>
        </NavLink>
      </div>
    </aside>
  );
};
