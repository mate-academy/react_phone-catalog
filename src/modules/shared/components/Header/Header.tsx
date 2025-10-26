import cn from "classnames";
import styles from "./Header.module.scss";
import { useCart, useFavorites, useSearch, useMenu } from "../../../../contexts";
import { Icon } from "../Icon/Icon";
import { Link, NavLink } from "react-router-dom";
import classNames from "classnames";
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import { SearchInput } from '../SearchInput/SearchInput';

export const Header = () => {
  const { getTotalCount } = useCart();
  const { getFavoritesCount } = useFavorites();
  const { showSearch, setSearchQuery, searchPlaceholder } = useSearch();
  const { openMenu } = useMenu();
  const { t } = useTranslation();

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
    <header className={cn(styles.header, "page__header")}>
      <div className={styles.header__wrap}>
        <div className={styles.header__logo}>
          <Link to="/" className={styles["header__logo-link"]}>
            <img
              src="/img/logo.svg"
              alt="Nice Gadgets"
              className={styles["header__logo-image"]}
            />
          </Link>
        </div>

        <nav className={styles.header__nav}>
          <ul className={styles["header__nav-list"]}>
            <li
              className={cn(
                styles["header__nav-item"],
                styles["header__nav-item--active"]
              )}
            >
              <NavLink to="/" className={({ isActive }) => { return classNames(styles["header__nav-link"], { [styles["header__nav-link--active"]]: isActive }) }}>
                {t('nav.home')}
              </NavLink>
            </li>

            <li className={styles["header__nav-item"]}>
              <NavLink to="/category/phones" className={styles["header__nav-link"]}>
                {t('nav.phones')}
              </NavLink>
            </li>

            <li className={styles["header__nav-item"]}>
              <NavLink to="/category/tablets" className={styles["header__nav-link"]}>
                {t('nav.tablets')}
              </NavLink>
            </li>

            <li className={styles["header__nav-item"]}>
              <NavLink to="/category/accessories" className={styles["header__nav-link"]}>
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
        <div className={styles["header__actions-desktop"]}>
          <LanguageSwitcher />

          <Link to="/favorites" className={styles.header__button} aria-label={t('header.favorites')}>
            <Icon name="like" badge={favoritesCount} />
          </Link>

          <Link to="/cart" className={styles.header__button} aria-label={t('header.cart')}>
            <Icon name="cart" badge={totalCount} />
          </Link>
        </div>

        <div className={styles["header__actions-mobile"]}>
          <button
            onClick={handleMenuClick}
            className={styles.header__button}
            aria-label={t('header.menu')}
            type="button"
          >
            <span className={cn("icon", "icon__menu")} />
          </button>
        </div>
      </div>
    </header>
  );
};
