import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useCart, useFavorites, useMenu } from '../../../../contexts';
import { Icon } from '../Icon/Icon';
import { Badge } from '../Badge/Badge';
import styles from './Menu.module.scss';

export const Menu = () => {
  const { t } = useTranslation();
  const { getTotalCount } = useCart();
  const { getFavoritesCount } = useFavorites();
  const { isMenuOpen, closeMenu } = useMenu();

  const favoritesCount = getFavoritesCount();
  const totalCount = getTotalCount();

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
              className={({ isActive }) =>
                cn(styles['menu__nav-link'], {
                  [styles['menu__nav-link--active']]: isActive,
                })
              }
            >
              {t('nav.home')}
            </NavLink>
          </li>
          <li className={styles['menu__nav-item']}>
            <NavLink
              to="/phones"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                cn(styles['menu__nav-link'], {
                  [styles['menu__nav-link--active']]: isActive,
                })
              }
            >
              {t('nav.phones')}
            </NavLink>
          </li>
          <li className={styles['menu__nav-item']}>
            <NavLink
              to="/tablets"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                cn(styles['menu__nav-link'], {
                  [styles['menu__nav-link--active']]: isActive,
                })
              }
            >
              {t('nav.tablets')}
            </NavLink>
          </li>
          <li className={styles['menu__nav-item']}>
            <NavLink
              to="/accessories"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                cn(styles['menu__nav-link'], {
                  [styles['menu__nav-link--active']]: isActive,
                })
              }
            >
              {t('nav.accessories')}
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.menu__footer}>
        <NavLink
          to="/favorites"
          onClick={handleLinkClick}
          className={({ isActive }) => {
            return cn(styles['menu__footer-button'], {
              [styles['menu__footer-button--active']]: isActive,
            });
          }}
          aria-label={t('header.favorites')}
        >
          <Badge badgeContent={favoritesCount} color="error">
            <Icon name="like" />
          </Badge>
        </NavLink>
        <NavLink
          to="/cart"
          onClick={handleLinkClick}
          className={({ isActive }) => {
            return cn(styles['menu__footer-button'], {
              [styles['menu__footer-button--active']]: isActive,
            });
          }}
          aria-label={t('header.cart')}
        >
          <Badge badgeContent={totalCount} color="error">
            <Icon name="cart" />
          </Badge>
        </NavLink>
      </div>
    </aside>
  );
};
