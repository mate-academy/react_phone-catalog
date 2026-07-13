import { Logo } from '../../../../components/Logo';
import styles from './TopBar.styles.module.scss';
import BurgerIcon from '../../../../assets/icons/menu.svg?react';
import { Nav } from '../Nav';
import FavoritesHeart from '../../../../assets/icons/favouritesheart.svg?react';
import FavoritesBag from '../../../../assets/icons/shoppingbag.svg?react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useFavorites } from '../../../../context';
import { useCart } from '../../../../context/CartContext';
import { ThemeSwitcher } from '../../../../components/ThemeSwitcher';

type Props = {
  onMenuToggle: () => void;
};

export const TopBar = ({ onMenuToggle }: Props) => {
  const { favorites } = useFavorites();
  const { cart } = useCart();

  return (
    <div className={styles.topBar}>
      <div className={styles.left}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>

        <div className={styles.desktopNav}>
          <Nav variant="desktop" />
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.themeWrapper}>
          <ThemeSwitcher />
        </div>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            classNames(styles.favoritesHeart, {
              [styles.active]: isActive,
            })
          }
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

        <button type="button" className={styles.burger} onClick={onMenuToggle}>
          <BurgerIcon />
        </button>
      </div>
    </div>
  );
};
