import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './HeaderStyles.module.scss';
import { Logo } from '../Logo/Logo';

export const NavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  return (
    <>
      <nav className={styles.navBar}>
        <div className={styles.navList}>
          <div className={styles.headerLeftSide}>
            <Logo />
            <div className={styles.headerContent}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${styles.headerLinkText} ${isActive ? styles.activeLink : ''}`
                }
              >
                <p className={styles.headerText}>HOME</p>
              </NavLink>
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  `${styles.headerLinkText} ${isActive ? styles.activeLink : ''}`
                }
              >
                <p className={styles.headerText}>PHONES</p>
              </NavLink>
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  `${styles.headerLinkText} ${isActive ? styles.activeLink : ''}`
                }
              >
                <p className={styles.headerText}>TABLETS</p>
              </NavLink>
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  `${styles.headerLinkText} ${isActive ? styles.activeLink : ''}`
                }
              >
                <p className={styles.headerText}>ACCESSORIES</p>
              </NavLink>
            </div>
          </div>
          <div className={styles.headerRightSide}>
            <div className={styles.headerIcons}>
              <div className={styles.iconBorder}>
                <NavLink
                  to="/favorites"
                  className={({ isActive }) =>
                    `${styles.headerIconFav} ${isActive ? styles.activeLink : ''}`
                  }
                >
                  <img src="/react_phone-catalog/img/icons/favorite.svg" alt="to favorites" className={styles.fav} />
                </NavLink>
              </div>
              <div className={styles.iconBorder}>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `${styles.headerIconCart} ${isActive ? styles.activeLink : ''}`
                  }
                >
                  <img src="/react_phone-catalog/img/icons/cart.svg" alt="to cart" className={styles.carti} />
                </NavLink>
              </div>
            </div>

            <div className={styles.burgerLine}>
              <img
                src="/img/Union.svg"
                onClick={() => setIsSidebarOpen(prev => !prev)}
                className={styles.burger}
                alt="Open Menu"
              />
            </div>
          </div>
        </div>
      </nav>

      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarContent}>
          <div>
            <nav className={styles.menuNavBar}>
              <div className={styles.navList}>
                <Logo />
                <div className={styles.burgerLine}>
                  <img
                    src="/img/icons/close.svg"
                    onClick={() => setIsSidebarOpen(prev => !prev)}
                    className={styles.burgerClose}
                    alt="Close Menu"
                  />
                </div>
              </div>
            </nav>

            <div className={styles.menuContent}>
              <NavLink to="/" onClick={() => setIsSidebarOpen(false)}>
                <p className={styles.linkText}>HOME</p>
              </NavLink>
              <NavLink to="/phones" onClick={() => setIsSidebarOpen(false)}>
                <p className={styles.linkText}>PHONES</p>
              </NavLink>
              <NavLink to="/tablets" onClick={() => setIsSidebarOpen(false)}>
                <p className={styles.linkText}>TABLETS</p>
              </NavLink>
              <NavLink to="/accessories" onClick={() => setIsSidebarOpen(false)}>
                <p className={styles.linkText}>ACCESSORIES</p>
              </NavLink>
            </div>
          </div>

          <div className={styles.menuIcons}>
            <NavLink to="/cart" onClick={() => setIsSidebarOpen(false)}>
              <button className={styles.menuButtonsCart}>
                <img src="/react_phone-catalog/img/icons/cart.svg" alt="to cart" className={styles.menuButtonsIcons} />
              </button>
            </NavLink>
            <NavLink to="/favorites" onClick={() => setIsSidebarOpen(false)}>
              <button className={styles.menuButtonsFav}>
                <img

                  src="/react_phone-catalog/img/icons/favorite.svg"
                  alt="to favorites"
                  className={styles.menuButtonsIcons}
                />
              </button>
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};
