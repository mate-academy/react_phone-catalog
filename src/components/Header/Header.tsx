import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

import logoLight from '../../assets/icons/Logo.svg';
import logoDark from '../../assets/icons/Logo-black.svg';
import Heart from '../../assets/icons/Favourites (Heart Like).svg';
import HeartDark from '../../assets/icons/Favourites (Heart Like)-black.svg';
import Cart from '../../assets/icons/Shopping bag (Cart).svg';
import CartDark from '../../assets/icons/Shopping bag (Cart)-black.svg';
import Menu from '../../assets/icons/Union.svg';
import MenuDark from '../../assets/icons/Union-black.svg';
import Close from '../../assets/icons/Close-burger.svg';
import CloseDark from '../../assets/icons/Close-black.svg';

import { useIsMobile } from '../../hooks/useIsMobile';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useCart } from '../../contexts/CartContext';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const isMobile = useIsMobile(639);
  const { favorites } = useFavorites();
  const { cartItems } = useCart();
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const uniqueFavorites = Array.from(new Set(favorites));
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const logo = theme === 'dark' ? logoDark : logoLight;
  const heartIcon = theme === 'dark' ? HeartDark : Heart;
  const cartIcon = theme === 'dark' ? CartDark : Cart;
  const menuIcon = theme === 'dark' ? MenuDark : Menu;
  const closeIcon = theme === 'dark' ? CloseDark : Close;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.logoContainer}>
            <NavLink to="/" className={styles.logoLink}>
              <img src={logo} alt="Nice Gadgets Logo" className={styles.logo} />
            </NavLink>
          </div>

          {!isMobile && (
            <div className={styles.navWrapper}>
              <nav className={styles.nav}>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ''}`
                  }
                >
                  <span>{t('nav.home')}</span>
                </NavLink>
                <NavLink
                  to="/phones"
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ''}`
                  }
                >
                  <span>{t('nav.phones')}</span>
                </NavLink>
                <NavLink
                  to="/tablets"
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ''}`
                  }
                >
                  <span>{t('nav.tablets')}</span>
                </NavLink>
                <NavLink
                  to="/accessories"
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ''}`
                  }
                >
                  <span>{t('nav.accessories')}</span>
                </NavLink>
              </nav>
            </div>
          )}
        </div>

        <div className={styles.icons}>
          {!isOpen && (
            <LanguageSwitcher theme={theme} toggleTheme={toggleTheme} />
          )}

          {isMobile && (
            <button
              className={`${styles.iconWrapper} ${styles.menu} ${isOpen ? styles.open : ''}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <img src={menuIcon} alt="Menu" className={styles.burgerIcon} />
              <img src={closeIcon} alt="Close" className={styles.closeIcon} />
            </button>
          )}

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `${styles.iconWrapper} ${styles.heart} ${isActive ? styles.active : ''}`
            }
          >
            <img src={heartIcon} alt={t('nav.favorites')} />
            {uniqueFavorites.length > 0 && (
              <span className={styles.badge}>
                <span>{uniqueFavorites.length}</span>
              </span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${styles.iconWrapper} ${styles.cart} ${isActive ? styles.active : ''}`
            }
          >
            <img src={cartIcon} alt={t('nav.cart')} />
            {cartCount > 0 && (
              <span className={styles.badge}>
                <span>{cartCount}</span>
              </span>
            )}
          </NavLink>
        </div>
      </div>

      {isMobile && isOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
              onClick={() => setIsOpen(false)}
            >
              {t('nav.home')}
            </NavLink>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
              onClick={() => setIsOpen(false)}
            >
              {t('nav.phones')}
            </NavLink>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
              onClick={() => setIsOpen(false)}
            >
              {t('nav.tablets')}
            </NavLink>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
              onClick={() => setIsOpen(false)}
            >
              {t('nav.accessories')}
            </NavLink>
          </nav>

          <div className={styles.bottomIcons}>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `${styles.iconWrapper} ${styles.heart} ${isActive ? styles.active : ''}`
              }
              onClick={() => setIsOpen(false)}
            >
              <img src={heartIcon} alt={t('nav.favorites')} />
              {uniqueFavorites.length > 0 && (
                <span className={styles.badge}>
                  <span>{uniqueFavorites.length}</span>
                </span>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${styles.iconWrapper} ${styles.cart} ${isActive ? styles.active : ''}`
              }
              onClick={() => setIsOpen(false)}
            >
              <img src={cartIcon} alt={t('nav.cart')} />
              {cartCount > 0 && (
                <span className={styles.badge}>
                  <span>{cartCount}</span>
                </span>
              )}
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};
