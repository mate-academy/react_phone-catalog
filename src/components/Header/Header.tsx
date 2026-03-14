import React from 'react';
import styles from './Header.module.scss';
import { MobileMenu } from '../MobileMenu';

type Props = {
  openMenu: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const Header: React.FC<Props> = ({ openMenu, setIsMenuOpen }) => {
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <>
      <header className={styles.header}>
        <a href="#" className={styles.logoLink}>
          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet="/img/icon/nice-gadgets-desktop.svg"
            />
            <img
              src="/img/icon/nice-gadgets-logo.svg"
              alt="Nice gadgets"
              className={styles.logo}
            />
          </picture>
        </a>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="#" className={styles.menuLink}>
                Home
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#" className={styles.menuLink}>
                Phones
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#" className={styles.menuLink}>
                Tablets
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#" className={styles.menuLink}>
                Accessories
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href="#" className={styles.actionsLink}>
            <img src="/img/icon/favourites-logo.svg" alt="Favourites" />
          </a>
          <a href="#" className={styles.actionsLink}>
            <img src="/img/icon/shopping-bag-logo.svg" alt="Shopping bag" />
          </a>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          onClick={toggleMenu}
        >
          <img
            src={
              openMenu ? '/img/icon/close-logo.svg' : '/img/icon/menu-logo.svg'
            }
            alt="Menu"
          />
        </button>
      </header>
      {openMenu && <MobileMenu />}
    </>
  );
};
