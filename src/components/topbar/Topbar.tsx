import { Link, NavLink } from 'react-router-dom';
import { Navigation } from '../Navigation/index';
import styles from './TopBar.module.scss';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useCart } from '../../contexts/CartContext';
import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
type Props = {
  isAside?: boolean;
};

export function TopBar({ isAside = false }: Props) {
  const { favorites } = useFavorites();
  const { cartItems, totalQuantity } = useCart();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const handleSettingsOpening = () => {
    setIsSettingsOpen(prev => !prev);
  };

  return (
    <div className={`${styles.topBar} ${theme === 'light' && styles['topBar--lightTheme']}`}>
      <div className={styles.topBar__leftSide}>
        <div className={styles.topBar__logo}>
          <a
            href="/"
            className={`${styles.icon} ${styles['icon--logo']} ${theme === 'light' && styles['icon--logo-lightTheme']}`}
          ></a>
        </div>

        <Navigation />
      </div>

      {isAside ? (
        <div className={styles.topBar__rightIcons}>
          <div
            className={`${styles.topBar__iconElement} ${styles['topBar__iconElement--menu']} ${theme === 'light' && styles['topBar__iconElement--lightTheme']}`}
          >
            <a
              href="/"
              className={`${styles.icon} ${styles['icon--close']}  ${theme === 'light' && styles['icon--close-lightTheme']}`}
            ></a>
          </div>
        </div>
      ) : (
        <div className={styles.topBar__rightIcons}>
          <div
            className={`${styles.topBar__iconElement} ${theme === 'light' && styles['topBar__iconElement--lightTheme']} ${styles['topBar__iconElement--menu']}`}
          >
            <Link
              to="/menu"
              className={`${styles.icon} ${styles['icon--menu']} ${theme === 'light' && styles['icon--menu-lightTheme']}`}
            ></Link>
          </div>

          <div
            className={`${styles.topBar__iconElement} ${theme === 'light' && styles['topBar__iconElement--lightTheme']} ${styles['topBar__iconElement--visibleOnTablet']}`}
          >
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive
                  ? `${styles.icon} ${styles['icon--favorites']}  ${theme === 'light' && styles['icon--favorites-lightTheme']} ${styles['icon--active']}`
                  : `${styles.icon} ${styles['icon--favorites']} ${theme === 'light' && styles['icon--favorites-lightTheme']}`
              }
            >
              {favorites.length > 0 && (
                <div className={styles.topBar__quantity}>{favorites.length}</div>
              )}
            </NavLink>
          </div>

          <div
            className={`${styles.topBar__iconElement} ${theme === 'light' && styles['topBar__iconElement--lightTheme']} ${styles['topBar__iconElement--visibleOnTablet']}`}
          >
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? `${styles.icon} ${styles['icon--cart']} ${styles['icon--active']}  ${theme === 'light' && styles['icon--cart-lightTheme']}`
                  : `${styles.icon} ${styles['icon--cart']}  ${theme === 'light' && styles['icon--cart-lightTheme']}`
              }
            >
              {cartItems.length > 0 && (
                <div className={styles.topBar__quantity}>{totalQuantity}</div>
              )}
            </NavLink>
          </div>

          <div className={`${styles.topBar__settings}`}>
            <div
              className={`${styles.topBar__iconElement} ${theme === 'light' && styles['topBar__iconElement--lightTheme']} ${isSettingsOpen && styles['topBar__iconElement--active']} ${styles['topBar__iconElement--settings']} ${isSettingsOpen && styles['topBar__iconElement--settings-open']}`}
              onClick={() => handleSettingsOpening()}
            >
              <a
                className={`${styles.icon} ${styles['icon--settings']} ${isSettingsOpen && styles['icon--active']} ${theme === 'light' && styles['icon--settings-lightTheme']}`}
              ></a>
            </div>

            <div
              className={`${styles.topBar__settingsBox} ${isSettingsOpen && styles['topBar__settingsBox--open']}`}
            >
              <div className={`${styles.topBar__settingsElement} ${styles.topBar__theme}`}>
                {theme === 'dark' ? (
                  <span className={`${styles.icon} ${styles['icon--darkTheme']}`}></span>
                ) : (
                  <span className={`${styles.icon} ${styles['icon--lightTheme']}`}></span>
                )}

                <div
                  className={`
    ${styles.topBar__switcher}
    ${theme === 'light' ? styles['topBar__switcher--active'] : ''}
    ${theme === 'light' ? styles['topBar__switcher--light'] : ''}
  `}
                  onClick={toggleTheme}
                />
              </div>

              <div className={`${styles.topBar__settingsElement} ${styles.topBar__language}`}>
                <span className={`${styles.topBar__language} ${styles['topBar__language--EN']}`}>
                  {language}
                </span>

                <div
                  className={`
    ${styles.topBar__switcher}
    ${language === 'UA' ? styles['topBar__switcher--active'] : ''}
    ${theme === 'light' ? styles['topBar__switcher--light'] : ''}
  `}
                  onClick={toggleLanguage}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
