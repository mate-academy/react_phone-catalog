import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { useContext, useState } from 'react';
import { ProductsContext } from '../../context/ProductsContext';
import { MobileMenu } from '../MobileMenu';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { favorites, totalItems } = useContext(ProductsContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  return (
    <>
      <header className={styles.header}>
        <Link to="/home" className={styles.logo}>
          <img
            src="./img/logo/Logo.svg"
            alt="Nice Gadgets"
            className={styles.logoimg}
          />
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li className={styles.li_links}>
              <NavLink
                to="/home"
                end
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                {t('home')}
              </NavLink>
            </li>
            <li className={styles.li_links}>
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                {t('phone')}
              </NavLink>
            </li>
            <li className={styles.li_links}>
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                {t('tablet')}
              </NavLink>
            </li>
            <li className={styles.li_links}>
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                {t('accesuar')}
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.language}>
          <button
            className={styles.languagebtn}
            onClick={() => i18n.changeLanguage('de')}
          >
            DE
          </button>

          <button
            className={styles.languagebtn}
            onClick={() => i18n.changeLanguage('en')}
          >
            EN
          </button>

          <button
            className={styles.languagebtn}
            onClick={() => i18n.changeLanguage('ua')}
          >
            UA
          </button>
        </div>
        <div className={styles.actions}>
          <div className={styles.boxAction}>
            <Link to="/favorites" className={styles.icon}>
              <div className={styles.cyrcle}>{favorites.length}</div>
              <img src="./img/icons/heart.svg" alt="Favorites" />
            </Link>
          </div>
          <div className={styles.boxAction}>
            <Link to="/cart" className={styles.icon}>
              <div className={styles.cyrcle}>{totalItems}</div>
              <img src="./img/icons/cart.svg" alt="Cart" />
            </Link>
          </div>
        </div>

        <div className={styles.burgerbox}>
          {!isMenuOpen && (
            <button
              className={styles.burgermenu}
              onClick={() => setIsMenuOpen(true)}
            >
              <img
                src="./img/icons/Menu.svg"
                alt="Burgermenu"
                className={styles.burgericon}
              />
            </button>
          )}
          {isMenuOpen && (
            <button
              className={styles.burgermenu}
              onClick={() => setIsMenuOpen(false)}
            >
              <img
                src="./img/icons/clouse.svg"
                alt="Burgermenu"
                className={styles.burgericon}
              />
            </button>
          )}
        </div>
      </header>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
