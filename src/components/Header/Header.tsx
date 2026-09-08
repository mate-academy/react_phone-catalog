import { useSelector } from 'react-redux';

import styles from './Header.module.scss';
import { Logo } from '../Logo';
import { Navigation } from '../Navigation';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { NavButtonItem } from '../NavButtonItem';
import { Icon } from '../Icon';
import { selectFavouritesCount } from '../../store/favourites/favouritesSlice';
import { selectCartCount } from '../../store/cart/cartSlice';
import { useMenu } from '../../hooks/useMenu';

export const Header = () => {
  const favsCounter = useSelector(selectFavouritesCount);
  const cartCounter = useSelector(selectCartCount);
  const { openMenu } = useMenu();

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Logo />
      </div>

      <div className={styles.header__nav}>
        <Navigation />
      </div>

      <div className={styles.header__items}>
        <div className={styles.header__item}>
          <ThemeSwitcher />
        </div>
        <div
          className={`${styles.header__item} ${styles['header__item--link']}`}
        >
          <NavButtonItem
            path="/favourites"
            type="heart"
            isSquare={true}
            counter={favsCounter}
          />
        </div>

        <div
          className={`${styles.header__item} ${styles['header__item--link']} ${styles['header__item--cart']}`}
        >
          <NavButtonItem
            path="/cart"
            type="cart"
            isSquare={true}
            counter={cartCounter}
          />
        </div>

        <button
          type="button"
          className={`${styles.header__item} ${styles['header__item--btn']}`}
          onClick={() => {
            openMenu();
          }}
        >
          <Icon type="menu" />
        </button>
      </div>
    </header>
  );
};
