import { NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import { Search } from '../../components/Search';
import { NavigationMenu } from './components/NavigationMenu';
import { NavigationIcons } from './components/NavigationIcons';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onCloseMenu = () => setIsMenuOpen(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen);
  }, [isMenuOpen]);

  const { pathname } = useLocation();

  const showSearch =
    pathname === '/phones' ||
    pathname === '/tablets' ||
    pathname === '/accessories';

  return (
    <header className={styles.header}>
      <div className={styles.header__navbar}>
        <NavLink to="/" className={styles.header__img}>
          <img src="img/logo.svg" alt="logo" />
        </NavLink>
        <nav className={styles.header__nav}>
          <NavigationMenu />
        </nav>

        <div className={styles.header__rightBlock}>
          {showSearch && <Search />}
          <div className={styles.header__icons}>
            <NavigationIcons />
          </div>
        </div>

        <div className={styles.header__hamburger} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div
        className={classNames(styles.header__hamburgerMenu, {
          [styles.header__menuOpen]: isMenuOpen,
        })}
      >
        <nav className={styles.header__mobileNav}>
          <NavigationMenu onClose={onCloseMenu} />
        </nav>
        <div className={styles.header__mobileIcons}>
          <NavigationIcons onClose={onCloseMenu} />
        </div>
      </div>
    </header>
  );
};
