import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Navbar.module.scss';
import useCartStore from '../../stores/useCartStore';
import SearchInput from '../SearchInput/SearchInput';
import useLanguageStore, {
  SupportedLanguage,
} from '../../stores/useLanguageStore';
import useThemeStore, { Theme } from '../../stores/useThemeStore'; // Імпорт стору теми
import useFavoritesStore from '../../stores/useFavoritesStore';
import favoritesHeartIcon from '../../images/icons/favourites-heart.svg';
import shoppingBagIcon from '../../images/icons/shopping-bag.svg';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import { Logo } from '../Logo';

// Визначення інтерфейсу для пропсів Navbar
interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles['nav-item'], {
    [styles['nav-item-active']]: isActive,
  });

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  const { favorites } = useFavoritesStore();
  const { getTotalItems } = useCartStore();
  const { currentLanguage, setLanguage } = useLanguageStore();
  const { currentTheme, setTheme } = useThemeStore(); // Отримуємо тему та сеттер
  const { category } = useParams<{
    category: string;
  }>();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setLanguage(event.target.value as SupportedLanguage);
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value as Theme);
  };

  return (
    <nav data-cy="nav" className={styles.nav}>
      {/* лого */}
      <div className={styles.nav__logo}>
        <Logo />
      </div>

      <button
        className={styles.nav__burger}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? '✕' : '☰'}
      </button>

      <div
        className={classNames(styles.mobileMenu, {
          [styles.open]: isMenuOpen,
        })}
      >
        <NavLink
          to="/"
          className={getLinkClass}
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/phones"
          className={getLinkClass}
          onClick={() => setIsMenuOpen(false)}
        >
          Phones
        </NavLink>
        <NavLink
          to="/tablets"
          className={getLinkClass}
          onClick={() => setIsMenuOpen(false)}
        >
          Tablets
        </NavLink>
        <NavLink
          to="/accessories"
          className={getLinkClass}
          onClick={() => setIsMenuOpen(false)}
        >
          Accessories
        </NavLink>
      </div>

      {/* навігація */}
      <div className={styles.nav__list}>
        <NavLink to="/" className={getLinkClass}>
          Home
        </NavLink>

        <NavLink to="/phones" className={getLinkClass}>
          Phones
        </NavLink>

        <NavLink to="/tablets" className={getLinkClass}>
          Tablets
        </NavLink>

        <NavLink to="/accessories" className={getLinkClass}>
          Accessories
        </NavLink>
      </div>

      <div className={styles['navbar-end']}>
        {/* <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search..."
        /> */}

        {(category === 'phones' ||
          category === 'tablets' ||
          category === 'accessories') && (
          <SearchInput
            value={searchQuery}
            onChange={onSearchChange}
            placeholder={`Search in ${category}`}
          />
        )}

        {/* Селект для вибору мови */}
        {/* <select
          value={currentLanguage}
          onChange={handleLanguageChange}
          className="language-selector"
        >
          <option value="en">EN</option>
          <option value="uk">UA</option>
          <option value="de">DE</option>
          <option value="fr">FR</option>
        </select> */}

        <LanguageSelect />

        {/* Селект для вибору теми */}
        <select
          value={currentTheme}
          onChange={handleThemeChange}
          className="theme-selector"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="red">Red</option>
        </select>

        {/* кнопка улюблене */}
        <NavLink to="/favourites" className={styles.icon__button}>
          <span className={styles.icon__item}>
            <img
              className={styles.icon}
              src={favoritesHeartIcon}
              alt="favourites heart"
            />
          </span>

          {favorites.length > 0 && (
            <span className={styles['notification-badge']}>
              {favorites.length}
            </span>
          )}
        </NavLink>

        {/* кнопка корзина */}
        <NavLink to="/cart" className={styles.icon__button}>
          <span className={styles.icon__item}>
            <img
              className={styles.icon}
              src={shoppingBagIcon}
              alt="shopping bag"
            />
          </span>

          {getTotalItems() > 0 && (
            <span className={styles['notification-badge']}>
              {getTotalItems()}
            </span>
          )}
        </NavLink>
      </div>
    </nav>
  );
};
