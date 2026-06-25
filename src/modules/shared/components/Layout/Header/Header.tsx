import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import styles from './Header.module.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import { useTheme } from '../../../../../contexts/ThemeContext';
import { Icons } from '../../UI/Icons';
import { ThemeToggler } from '../../UI/ThemeToggler/ThemeToggler';
import { LanguageToggler } from '../../UI/LanguageToggler';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.link} ${isActive ? styles.isActive : ''} `;

  const logoDark = '/img/icons/logo.svg';
  const logoLight = '/img/icons/logo-light.svg';
  const { theme } = useTheme();

  const { t } = useTranslation();

  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [inputValue, setInputValue] = useState(query);
  const debouncedQuery = useDebounce(inputValue, 300);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    if (debouncedQuery) {
      newParams.set('query', debouncedQuery);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  }, [debouncedQuery]);

  const searchAvailableRoutes = ['/phones', '/tablets', '/accessories'];
  const isSearchVisible = searchAvailableRoutes.includes(location.pathname);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <Link to="/">
            <img
              className={styles.logo}
              src={theme === 'dark' ? logoDark : logoLight}
              alt={t('header.logoAlt')}
            />
          </Link>
        </div>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.list}>
            <li>
              <NavLink to="/" className={getLinkClass}>
                {t('header.home')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/phones" className={getLinkClass}>
                {t('header.phones')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/tablets" className={getLinkClass}>
                {t('header.tablets')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/accessories" className={getLinkClass}>
                {t('header.accessories')}
              </NavLink>
            </li>
          </ul>
        </nav>

        {isSearchVisible && (
          <div className={styles.searchContainer}>
            <input
              type="search"
              placeholder={t('header.searchPlaceholder')}
              value={inputValue}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </div>
        )}

        <div
          className={`${styles.navActions} ${isMenuOpen ? styles.navOpen : ''}`}
        >
          <div className={styles.togglerWrapper}>
            <ThemeToggler />

            <LanguageToggler />
          </div>

          <div className={styles.icons}>
            <Icons />
          </div>
        </div>

        <button
          className={`${styles.burger} ${isMenuOpen ? styles.burgerActive : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
        </button>
      </div>
    </header>
  );
};
