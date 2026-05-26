import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import debounce from 'lodash.debounce';

import { Menu } from '../Menu';
import { Actions } from '../Actions';
import { Icon } from '../Icon/Icon';
import { useTheme } from '../../context/ThemeContext';
import { navLinks } from '../../../../constants/navLinks';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const { theme, toggleTheme } = useTheme();

  const updateQuery = useMemo(
    () =>
      debounce((value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value) {
          params.set('query', value);
        } else {
          params.delete('query');
        }

        setSearchParams(params);
      }, 500),
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    updateQuery(query);

    return updateQuery.cancel;
  }, [query]);

  const isProductPage = [
    '/phones',
    '/tablets',
    '/accessories',
    '/products',
  ].includes(location.pathname);

  return (
    <>
      <header className={styles.header}>
        <div className={styles['header__top-bar']}>
          <Link to="/" className={styles['header__logo-container']}>
            <img
              src={
                theme === 'light'
                  ? './img/icons/logo.svg'
                  : './img/icons/logo-dark.svg'
              }
              alt={theme === 'light' ? 'Logo' : 'Logo dark'}
              className={styles.header__logo}
            />
          </Link>

          <nav className={styles.header__nav}>
            <ul className={styles.header__list}>
              {navLinks.map(link => (
                <NavLink
                  to={link.path}
                  key={link.title}
                  className={({ isActive }) =>
                    cn(styles.header__link, {
                      [styles['header__link--active']]: isActive,
                    })
                  }
                >
                  {link.title}
                </NavLink>
              ))}
            </ul>
          </nav>

          <div className={styles['header__icons-container']}>
            {isProductPage && (
              <div className={styles['header__search-wrapper']}>
                <input
                  type="search"
                  className={styles.header__search}
                  placeholder="Search product..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />

                {query ? (
                  <button
                    type="button"
                    className={styles['header__search-btn']}
                    onClick={() => setQuery('')}
                  >
                    <Icon name="close" />
                  </button>
                ) : (
                  <div className={styles['header__search-icon']}>
                    <Icon name="search" />
                  </div>
                )}
              </div>
            )}

            <button
              className={`
                ${styles['header__icon-container']}
                ${styles['header__switch-theme']}
              `}
              onClick={toggleTheme}
            >
              {theme === 'light' ? 'Dark' : 'Light'}
            </button>

            <div className={styles['header__icons-wrapper']}>
              <div
                className={styles['header__icon-container']}
                onClick={toggleMenu}
              >
                <Icon name={isMenuOpen ? 'close' : 'menu'} />
              </div>
            </div>

            <div className={styles.header__icons}>
              <Actions variant="header" />
            </div>
          </div>
        </div>
      </header>

      <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </>
  );
};
