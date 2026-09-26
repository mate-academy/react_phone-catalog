import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/icons/logo-dark.svg';
import logoWhite from '../../assets/icons/logo-white.svg';
import close from '../../assets/icons/close.svg';
import closeWhite from '../../assets/icons/close-white.svg';
import heart from '../../assets/icons/heart.svg';
import heartWhite from '../../assets/icons/heart-white.svg';
import cart from '../../assets/icons/cart.svg';
import cartWhite from '../../assets/icons/cart-white.svg';

import styles from './MobileMenu.module.scss';

import { useContext } from 'react';
import { FavouritesContext } from '../context/FavouritesContext';
import { CartContext } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export const MobileMenu = () => {
  const context = useContext(FavouritesContext);
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error('MobileMenu must be used inside FavouritesProvider');
  }

  if (!cartContext) {
    throw new Error('MobileMenu must be used inside CartProvider');
  }

  const { favourites } = context;
  const { cartItems } = cartContext;
  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <aside className={styles.menu}>
      <header className={styles.top}>
        <NavLink to="/" className={styles.logo}>
          <img src={theme === 'dark' ? logoWhite : logo} alt="Nice Gadgets" />
        </NavLink>
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => navigate(-1)}
        >
          <img src={theme === 'dark' ? closeWhite : close} alt="Close menu" />
        </button>
      </header>
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
      <div className={styles.languageThemeButtons}>
        <div className={styles.languageSwitcher}>
          <button
            type="button"
            className={`${styles.languageButton} ${
              language === 'en' ? styles.selected : ''
            }`}
            onClick={() => setLanguage('en')}
          >
            EN
          </button>

          <button
            type="button"
            className={`${styles.languageButton} ${
              language === 'ua' ? styles.selected : ''
            }`}
            onClick={() => setLanguage('ua')}
          >
            UA
          </button>
        </div>

        <button
          type="button"
          className={`${styles.themeSwitcher} ${
            theme === 'dark' ? styles.dark : ''
          }`}
          onClick={toggleTheme}
          aria-label={
            theme === 'light' ? t('switchToDarkTheme') : t('switchToLightTheme')
          }
        >
          <span className={styles.themeCircle} />
        </button>
      </div>

      <div className={styles.actions}>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `${styles.icon} ${isActive ? styles.active : ''}`
          }
        >
          <span className={styles.sectionIcon}>
            <img src={theme === 'dark' ? heartWhite : heart} alt="Favourites" />
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
            <img src={theme === 'dark' ? cartWhite : cart} alt="Cart" />
            {totalCartItems > 0 && (
              <span className={styles.counter}>{totalCartItems}</span>
            )}
          </span>
        </NavLink>
      </div>
    </aside>
  );
};
