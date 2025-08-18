import React, { useEffect } from 'react';
import styles from './BurgerMenu.module.scss';
import { Logo } from '../Logo';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';

type Props = {
  onClose: () => void;
};

export const BurgerMenu: React.FC<Props> = ({ onClose }) => {
  const {
    isMenuOpen,
    cartProductsIds,
    favouriteProductsIds,
    theme,
    language,
    setLanguage,
    handleThemeChange,
  } = useAppContext();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  return (
    <header className={`${styles.burgerMenu} ${isMenuOpen ? styles.open : ''}`}>
      <div className={styles.topbar}>
        <Logo location="navbar" />
        <button onClick={onClose} className={styles.crossContainer}>
          <img className={styles.img} src={`/img/icons/${theme}-theme/Cross.svg`} alt="Cross" />
        </button>
      </div>

      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <NavLink
                onClick={onClose}
                to="/"
                className={({ isActive }) =>
                  `${styles.item} uppercaseText${isActive ? ` ${styles.activeLink}` : ''}`
                }
              >
                home
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={onClose}
                to="/phones"
                className={({ isActive }) =>
                  `${styles.item} uppercaseText${isActive ? ` ${styles.activeLink}` : ''}`
                }
              >
                phones
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={onClose}
                to="/tablets"
                className={({ isActive }) =>
                  `${styles.item} uppercaseText${isActive ? ` ${styles.activeLink}` : ''}`
                }
              >
                tablets
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={onClose}
                to="/accessories"
                className={({ isActive }) =>
                  `${styles.item} uppercaseText${isActive ? ` ${styles.activeLink}` : ''}`
                }
              >
                accessories
              </NavLink>
            </li>
            <li className={styles.settings}>
              <div className={styles.themes}>
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`${styles.themesItem} ${theme === 'light' ? styles.themesItemActive : ''}`}
                >
                  <div className={styles.themesLight}></div>
                </button>
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`${styles.themesItem} ${theme === 'dark' ? styles.themesItemActive : ''}`}
                >
                  <div className={styles.themesDark}></div>
                </button>
              </div>
              <div className={styles.languages}>
                <button
                  onClick={() => setLanguage('uk')}
                  className={`
                    ${styles.languagesItem} 
                    ${language === 'uk' ? styles.languagesItemActive : ''} 
                    ${styles.uk}
                  `}
                >UK</button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`
                    ${styles.languagesItem} 
                    ${language === 'en' ? styles.languagesItemActive : ''} 
                    ${styles.en}
                  `}
                >ENG</button>
              </div>
            </li>
          </ul>
        </nav>

        <div className={styles.icons}>
          <NavLink
            onClick={onClose}
            to={'/favorites'}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? `${styles.activeLink}` : ''} ${styles.heart}`
            }
          >
            <img
              className={styles.img}
              src={`/img/icons/${theme}-theme/Heart.svg`}
              alt="Heart"
            />

            {favouriteProductsIds.length > 0 && (
              <div className={styles.counter}>
                {favouriteProductsIds.length}
              </div>
            )}
          </NavLink>
          <NavLink
            onClick={onClose}
            to={'/cart'}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? `${styles.activeLink}` : ''}`
            }
          >
            <img className={styles.img} src={`/img/icons/${theme}-theme/Cart.svg`} alt="Cart" />

            {cartProductsIds.length > 0 && (
              <div className={styles.counter}>
                {cartProductsIds.length}
              </div>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
