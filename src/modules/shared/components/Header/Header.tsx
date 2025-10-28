import React from 'react';
import cn from 'classnames';
import styles from './Header.module.scss';
import {
  useCart,
  useFavorites,
  useSearch,
  useMenu,
} from '../../../../contexts';
import { Icon } from '../Icon/Icon';
import { Badge } from '../Badge/Badge';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import { SearchInput } from '../SearchInput/SearchInput';

export const Header = () => {
  const { getTotalCount } = useCart();
  const { getFavoritesCount } = useFavorites();
  const { showSearch, setSearchQuery, searchPlaceholder } = useSearch();
  const { openMenu } = useMenu();
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const favoritesCount = getFavoritesCount();
  const totalCount = getTotalCount();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openMenu();
  };

  return (
    <header
      className={cn(styles.header, 'page__header', {
        [styles['header--scrolled']]: isScrolled,
      })}
    >
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

        <nav className={styles.header__nav}>
          <ul className={styles['header__nav-list']}>
            <li className={styles['header__nav-item']}>
              <NavLink
                to="/"
                end
                className={({ isActive }) => {
                  return classNames(styles['header__nav-link'], {
                    [styles['header__nav-link--active']]: isActive,
                  });
                }}
              >
                {t('nav.home')}
              </NavLink>
            </li>

            <li className={styles['header__nav-item']}>
              <NavLink
                to="/phones"
                className={({ isActive }) => {
                  return classNames(styles['header__nav-link'], {
                    [styles['header__nav-link--active']]: isActive,
                  });
                }}
              >
                {t('nav.phones')}
              </NavLink>
            </li>

            <li className={styles['header__nav-item']}>
              <NavLink
                to="/tablets"
                className={({ isActive }) => {
                  return classNames(styles['header__nav-link'], {
                    [styles['header__nav-link--active']]: isActive,
                  });
                }}
              >
                {t('nav.tablets')}
              </NavLink>
            </li>

            <li className={styles['header__nav-item']}>
              <NavLink
                to="/accessories"
                className={({ isActive }) => {
                  return classNames(styles['header__nav-link'], {
                    [styles['header__nav-link--active']]: isActive,
                  });
                }}
              >
                {t('nav.accessories')}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {showSearch && (
        <div className={styles.header__search}>
          <SearchInput
            onSearch={handleSearch}
            placeholder={searchPlaceholder}
          />
        </div>
      )}

      <div className={styles.header__actions}>
        <div className={styles['header__actions-desktop']}>
          <div className={styles.header__button}>
            <LanguageSwitcher />
          </div>

          <NavLink
            to="/favorites"
            className={({ isActive }) => {
              return classNames(styles.header__button, {
                [styles['header__button--active']]: isActive,
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
            className={({ isActive }) => {
              return classNames(styles.header__button, {
                [styles['header__button--active']]: isActive,
              });
            }}
            aria-label={t('header.cart')}
          >
            <Badge badgeContent={totalCount} color="error">
              <Icon name="cart" />
            </Badge>
          </NavLink>
        </div>

        <div className={styles['header__actions-mobile']}>
          <button
            onClick={handleMenuClick}
            className={styles.header__button}
            aria-label={t('header.menu')}
            type="button"
          >
            <span className={cn('icon', 'icon__menu')} />
          </button>
        </div>
      </div>
    </header>
  );
};
