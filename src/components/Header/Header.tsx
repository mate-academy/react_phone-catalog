// #region imports
import { Menu } from './components/Menu';
import { NavList } from '../NavList';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { LanguageSelector } from '../LanguageSelector';
import { FavIcon } from './components/FavIcon';
import { CartIcon } from './components/CartIcon';
import { NavigationLink } from './components/NavigationLink';
import { MenuIcon } from './components/MenuIcon';
import { HomeLink } from '../HomeLink';
import { HeaderButton } from './components/HeaderButton';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/hooks';
import styles from './Header.module.scss';
// #endregion

export const Header = () => {
  const { t } = useTranslation('header');

  //#region consts
  const [isMenuShowed, setIsMenuShowed] = useState(false);
  const favorites = useAppSelector(state => state.favorites);
  const cart = useAppSelector(state => state.cart);
  //#endregion

  useEffect(() => {
    document.body.classList.toggle(styles.bodyWithMenu, isMenuShowed);

    return () => document.body.classList.remove(styles.bodyWithMenu);
  }, [isMenuShowed]);

  return (
    <header className={styles.header}>
      <nav className={styles.leftBar} aria-label={t('mainNavigation')}>
        <HomeLink size="small" variant="accent" />

        <div className={styles.navList}>
          <NavList />
        </div>
      </nav>

      <div className={styles.rightBar}>
        <LanguageSelector />

        <ThemeSwitcher />

        <div className={styles.menuLink}>
          <HeaderButton
            onClick={() => setIsMenuShowed(true)}
            ariaLabel={t('openMenu')}
            ariaExpanded={isMenuShowed}
          >
            <MenuIcon />
          </HeaderButton>
        </div>

        <nav className={styles.headerActions} aria-label={t('userActions')}>
          <NavigationLink
            to="/favorites"
            count={favorites.length}
            aria-label={t('favorites')}
          >
            <FavIcon />
          </NavigationLink>

          <NavigationLink to="/cart" count={cart.length} aria-label={t('cart')}>
            <CartIcon />
          </NavigationLink>
        </nav>
      </div>

      <Menu isOpen={isMenuShowed} setOpen={setIsMenuShowed} />
    </header>
  );
};
