import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo';
import styles from './Navbar.module.scss';
import { useAppDispatch, useAppState } from '../../contexts/AppContext';
import { BurgerMenu } from './BurgerMenu';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '../../modules/shared/hooks/useOnClickOutside';
import { getTranslation } from '../../modules/shared/utils/getTranslation';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';
import { getCartProductsCount } from '../../modules/shared/utils/getCartProductsCount';

export const Navbar: React.FC = () => {
  const { favouriteProducts, cartProducts, theme, language } = useAppState();
  const { setIsMenuOpen } = useAppDispatch();
  const t = getTranslation(language);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(settingsRef, () => setIsSettingsOpen(false));

  return (
    <>
      <nav className={styles.navbar}>
        <Logo location="navbar" />

        <ul className={`${styles.list} ${styles.tablet}`}>
          <li className={`${styles.item} uppercaseText`}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.activeLink : ''}`
              }
            >
              {t.navbar.home}
            </NavLink>
          </li>
          <li className={`${styles.item} uppercaseText`}>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.activeLink : ''}`
              }
            >
              {t.navbar.phones}
            </NavLink>
          </li>
          <li className={`${styles.item} uppercaseText`}>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.activeLink : ''}`
              }
            >
              {t.navbar.tablets}
            </NavLink>
          </li>
          <li className={`${styles.item} uppercaseText`}>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.activeLink : ''}`
              }
            >
              {t.navbar.accessories}
            </NavLink>
          </li>
        </ul>

        <div className={`${styles.icons} ${styles.tablet}`}>
          <NavLink
            to={'/favorites'}
            className={({ isActive }) =>
              `${isActive ? styles.activeLink : ''} ${styles.link}`
            }
          >
            <img
              className={styles.img}
              src={`/img/icons/${theme}-theme/Heart.svg`}
              alt={t.navbar.favorites}
            />

            {favouriteProducts.length > 0 && (
              <div className={styles.counter}>{favouriteProducts.length}</div>
            )}
          </NavLink>

          <NavLink
            to={'/cart'}
            className={({ isActive }) =>
              `${isActive ? styles.activeLink : ''} ${styles.link}`
            }
          >
            <img
              className={styles.img}
              src={`/img/icons/${theme}-theme/Cart.svg`}
              alt={t.navbar.cart}
            />

            {Object.keys(cartProducts).length > 0 && (
              <div className={styles.counter}>
                {getCartProductsCount(cartProducts)}
              </div>
            )}
          </NavLink>

          <div ref={settingsRef} className={styles.settings}>
            <button
              onClick={() => setIsSettingsOpen(prev => !prev)}
              className={`
                ${styles.settingsButton} 
                ${styles.link} 
                ${isSettingsOpen ? styles.activeLink : ''}
              `}
            >
              <svg
                className={`
                  ${styles.settingsIcon}
                  ${isSettingsOpen ? styles.settingsIconActive : ''}
                `}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <path d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z" />
              </svg>
            </button>

            <div
              className={`${styles.settingsMenu} ${isSettingsOpen ? styles.open : ''}`}
            >
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        <div className={`${styles.icons} ${styles.phone}`}>
          <button
            onClick={() => setIsMenuOpen(prev => !prev)}
            className={`
          ${styles.iconContainer} 
          ${styles.item}
        `}
          >
            <img
              src={`/img/icons/${theme}-theme/burger-menu.svg`}
              alt="Burger menu"
            />
          </button>
        </div>
      </nav>

      <BurgerMenu onClose={() => setIsMenuOpen(prev => !prev)} />
    </>
  );
};
