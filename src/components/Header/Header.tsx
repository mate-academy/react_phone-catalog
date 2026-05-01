import { NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../images/Icons/Logo.svg';
import menu from '../../images/Icons/Menu.png';
import close from '../../images/Icons/Close.png';
import { Navbar } from './Navbar';
import { useEffect, useState } from 'react';
import { Menu } from './Menu';
import { SearchBar } from './SearchBar';
import { Icons } from './Icons';

export const Header: React.FC = () => {
  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    if (menuActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuActive]);

  const location = useLocation();

  const catalogPaths = ['/phones', '/tablets', '/accessories'];
  const isCatalogPage = catalogPaths.includes(location.pathname);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.header__content}>
            <div className={styles.topBar}>
              <div className={styles.topBar__logoContainer}>
                <NavLink className={styles.topBar__logoLink} to="/">
                  <img
                    className={styles.topBar__logo}
                    src={logo}
                    alt="NG logo"
                  />
                </NavLink>
              </div>
              <div className={styles.topBar__navBar}>
                <Navbar onMenuClose={setMenuActive} />
              </div>

              <div className={styles.topBar__sideOptions}>
                {isCatalogPage && <SearchBar />}

                <div className={styles.topBar__icons}>
                  <Icons />
                </div>
              </div>

              <button
                className={styles.topBar__menuBtn}
                onClick={() => setMenuActive(!menuActive)}
              >
                {menuActive ? (
                  <img src={close} alt="Close" />
                ) : (
                  <img src={menu} alt="Menu" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {menuActive && <Menu onMenuClose={setMenuActive} />}
    </>
  );
};
