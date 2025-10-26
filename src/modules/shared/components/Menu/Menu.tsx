import styles from './Menu.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart, useFavorites, useMenu } from '../../../../contexts';
import { Icon } from '../Icon/Icon';
import cn from 'classnames';
import { useEffect } from 'react';

export const Menu = () => {
  const { t } = useTranslation();
  const { getTotalCount } = useCart();
  const { getFavoritesCount } = useFavorites();
  const { isMenuOpen, closeMenu } = useMenu();

  const favoritesCount = getFavoritesCount();
  const totalCount = getTotalCount();

  // Блокуємо скрол коли меню відкрите
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();
  };

  const handleLinkClick = () => {
    closeMenu();
  };

  if (!isMenuOpen) {
    return null;
  }

  return (
    <aside className={cn(styles.menu, { [styles['menu--open']]: isMenuOpen })}>
      <header className={styles.header}>
        <div className={styles.header__wrap}>
          <div className={styles.header__logo}>
            <Link to="/" className={styles['header__logo-link']}>
              <img
                src="/img/logo.svg"
                alt="Nice Gadgets"
                className={styles['header__logo-image']}
              />
            </Link>
          </div>
        </div>
        <div className={styles.header__actions}>
          <div className={styles['header__actions-mobile']}>
            <button
              onClick={handleClose}
              className={styles.header__button}
              aria-label={t('header.closeMenu')}
              type="button"
            >
              <span className={cn('icon', 'icon__close')} />
            </button>
          </div>
        </div>
      </header>

      <nav className={styles.menu__nav}>
        <ul className={styles['menu__nav-list']}>
          <li className={styles['menu__nav-item']}>
            <NavLink
              to="/"
              onClick={handleLinkClick}
              className={({ isActive }) => cn(styles['menu__nav-link'], { [styles['menu__nav-link--active']]: isActive })}
            >
              {t('nav.home')}
            </NavLink>
          </li>
          <li className={styles['menu__nav-item']}>
            <NavLink
              to="/category/phones"
              onClick={handleLinkClick}
              className={({ isActive }) => cn(styles['menu__nav-link'], { [styles['menu__nav-link--active']]: isActive })}
            >
              {t('nav.phones')}
            </NavLink>
          </li>
          <li className={styles['menu__nav-item']}>
            <NavLink
              to="/category/tablets"
              onClick={handleLinkClick}
              className={({ isActive }) => cn(styles['menu__nav-link'], { [styles['menu__nav-link--active']]: isActive })}
            >
              {t('nav.tablets')}
            </NavLink>
          </li>
          <li className={styles['menu__nav-item']}>
            <NavLink
              to="/category/accessories"
              onClick={handleLinkClick}
              className={({ isActive }) => cn(styles['menu__nav-link'], { [styles['menu__nav-link--active']]: isActive })}
            >
              {t('nav.accessories')}
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.menu__footer}>
        <Link
          to="/favorites"
          onClick={handleLinkClick}
          className={styles['menu__footer-button']}
          aria-label={t('header.favorites')}
        >
          <Icon name="like" badge={favoritesCount} />
        </Link>
        <Link
          to="/cart"
          onClick={handleLinkClick}
          className={styles['menu__footer-button']}
          aria-label={t('header.cart')}
        >
          <Icon name="cart" badge={totalCount} />
        </Link>
      </div>
    </aside>
  );
};
