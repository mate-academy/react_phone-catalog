import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import Cart from '@/assets/icons/cart.svg?react';
import Heart from '@/assets/icons/heart.svg?react';
import { useAppSelector } from '@/redux/hooks';
import { ROUTES } from '@/shared/constants';
import { useBodyScrollLock, useMediaQuery } from '@/shared/hooks';
import { cn } from '@/shared/utils';

import { LanguageSwitcher } from './LanguageSwitcher';
import styles from './Menu.module.scss';

type MenuProps = {
  isVisible: boolean;
};

export const Menu = ({ isVisible }: MenuProps) => {
  const { t } = useTranslation();
  const { isMobile } = useMediaQuery();

  const countFavorites = useAppSelector(
    state => state.favorites.favorite_ids.length,
  );
  const countItemsInCart = useAppSelector(state =>
    state.cart.items.reduce((prev, item) => prev + item.quantity, 0),
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
        {isMobile && <LanguageSwitcher />}
      </nav>

      <div className={styles.nav__block}>
        {!isMobile && <LanguageSwitcher />}
        <NavLink to={ROUTES.FAVORITES} className={styles.button__link}>
          <div className={styles.icon}>
            <Heart className={styles.menu__img} />
            {countFavorites > 0 && (
              <div className={styles.badge}>{countFavorites}</div>
            )}
          </div>
        </NavLink>

        <NavLink to={ROUTES.CART} className={styles.button__link}>
          <div className={styles.icon}>
            <Cart className={styles.menu__img} />
            {countItemsInCart > 0 && (
              <div className={styles.badge}>{countItemsInCart}</div>
            )}
          </div>
        </NavLink>
      </div>
    </aside>
  );
};
