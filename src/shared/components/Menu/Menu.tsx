import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import Cart from '@/assets/icons/cart.svg?react';
import Heart from '@/assets/icons/heart.svg?react';
import { useAppSelector } from '@/redux/hooks';
import { ROUTES } from '@/shared/constants';
import { useBodyScrollLock } from '@/shared/hooks';
import { cn } from '@/shared/utils';

import styles from './Menu.module.scss';

type MenuProps = {
  isVisible: boolean;
};

export const Menu = ({ isVisible }: MenuProps) => {
  const { t } = useTranslation();
  const countFavorites = useAppSelector(
    state => state.favorites.favorite_ids.length,
  );

  useBodyScrollLock(Boolean(isVisible));

  return (
    <aside
      id="mobile-menu"
      className={cn(styles.menu, { [styles.open]: isVisible })}
    >
      <nav className={styles.nav}>
        <NavLink className={styles.link} to={ROUTES.HOME}>
          {t('home')}
        </NavLink>
        <NavLink className={styles.link} to={ROUTES.PHONES}>
          {t('phones')}
        </NavLink>
        <NavLink className={styles.link} to={ROUTES.TABLETS}>
          {t('tablets')}
        </NavLink>
        <NavLink className={styles.link} to={ROUTES.ACCESSORIES}>
          {t('accessories')}
        </NavLink>
      </nav>

      <div className={styles.nav__block}>
        {/* <Button
          className={styles.menu__button}
          aria-label="Wishlist"
          //onClick={() => navigate(ROUTES.FAVORITES)}
        > */}
        <NavLink to={ROUTES.FAVORITES} className={styles.button__link}>
          <div className={styles.icon}>
            <Heart className={styles.menu__img} />
            {countFavorites > 0 && (
              <div className={styles.badge}>{countFavorites}</div>
            )}
          </div>
        </NavLink>
        {/* </Button> */}

        {/* <Button className={styles.menu__button} aria-label="Cart"> */}
        <NavLink to={ROUTES.CART} className={styles.button__link}>
          <div className={styles.icon}>
            <Cart className={styles.menu__img} />
            {countFavorites > 0 && <div className={styles.badge}>{10}</div>}
          </div>
        </NavLink>
        {/* </Button> */}
      </div>
    </aside>
  );
};
