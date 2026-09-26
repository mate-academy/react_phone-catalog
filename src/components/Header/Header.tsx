import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { FavouritesContext } from '../../components/context/FavouritesContext';
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';
import styles from './Header.module.scss';
import logo from '../../assets/icons/logo-dark.svg';
import logoWhite from '../../assets/icons/logo-white.svg';
import menu from '../../assets/icons/menu.svg';
import menuWhite from '../../assets/icons/menu-white.svg';
import heart from '../../assets/icons/heart.svg';
import heartWhite from '../../assets/icons/heart-white.svg';
import cart from '../../assets/icons/cart.svg';
import cartWhite from '../../assets/icons/cart-white.svg';
import { useLanguage } from '../context/LanguageContext';

export const Header = () => {
  const context = useContext(FavouritesContext);
  const cartContext = useContext(CartContext);

  if (!context) {
    throw new Error('Header must be used inside FavouritesProvider');
  }

  if (!cartContext) {
    throw new Error('Header must be used inside CartProvider');
  }

  const { favourites } = context;
  const { cartItems } = cartContext;

  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const location = useLocation();
  const navigate = useNavigate();
  const isCatalogPage =
    location.pathname === '/phones' ||
    location.pathname === '/tablets' ||
    location.pathname === '/accessories';

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';
  const [searchValue, setSearchValue] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newParams = new URLSearchParams(location.search);

      if (searchValue === '') {
        newParams.delete('query');
      } else {
        newParams.set('query', searchValue);
      }

      newParams.delete('page');

      navigate({ pathname: location.pathname, search: newParams.toString() });
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchValue, location.pathname, navigate]);

  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('Header must be used inside ThemeProvider');
  }

  const { theme, toggleTheme } = themeContext;
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo}>
        <img src={theme === 'dark' ? logoWhite : logo} alt="Nice Gadgets" />
      </NavLink>

      <nav className={styles.nav}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          {t('home')}
        </NavLink>
        <NavLink
          to="/phones"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          {t('phones')}
        </NavLink>
        <NavLink
          to="/tablets"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          {t('tablets')}
        </NavLink>
        <NavLink
          to="/accessories"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          {t('accessories')}
        </NavLink>
      </nav>
      {isCatalogPage && (
        <div className={styles.searchContainer}>
          <input
            className={styles.search}
            type="search"
            value={searchValue}
            placeholder={t('search')}
            onChange={event => {
              setSearchValue(event.target.value);
            }}
          />
        </div>
      )}
      <div className={styles.allButtons}>
        {!isCatalogPage && (
          <div className={styles.languageThemeButtons}>
            <div className={styles.languageSwitcher}>
              <button
                type="button"
                className={`${styles.languageButton} ${language === 'en' ? styles.selected : ''}`}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>

              <button
                type="button"
                className={`${styles.languageButton} ${language === 'ua' ? styles.selected : ''}`}
                onClick={() => setLanguage('ua')}
              >
                UA
              </button>
            </div>

            <button
              type="button"
              className={`${styles.themeSwitcher} ${theme === 'dark' ? styles.dark : ''}`}
              onClick={toggleTheme}
              aria-label={
                theme === 'light'
                  ? t('switchToDarkTheme')
                  : t('switchToLightTheme')
              }
            >
              <span className={styles.themeCircle} />
            </button>
          </div>
        )}

        <div className={styles.actions}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `${styles.icon} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.sectionIcon}>
              <img
                src={theme === 'dark' ? heartWhite : heart}
                alt="Favourites"
                className={styles.iconImage}
              />
              {favourites.length > 0 && (
                <span className={styles.counter}>{favourites.length}</span>
              )}
            </span>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${styles.icon} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.sectionIcon}>
              <img
                src={theme === 'dark' ? cartWhite : cart}
                alt="Cart"
                className={styles.iconImage}
              />
              {totalCartItems > 0 && (
                <span className={styles.counter}>{totalCartItems}</span>
              )}
            </span>
          </NavLink>
        </div>
      </div>

      <NavLink to="/menu" className={styles.menuButton}>
        <img
          src={theme === 'dark' ? menuWhite : menu}
          alt="Open menu"
          className={styles.menuIcon}
        />
      </NavLink>
    </header>
  );
};
