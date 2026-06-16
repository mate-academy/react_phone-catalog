import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { useState } from 'react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <NavLink to="/" className={styles.logo}>
            <img
              src="/img/icons/Logo.svg"
              alt="logo"
              className={styles.logoImg}
            />
          </NavLink>

          <nav className={styles.nav}>
            <ul className={styles.nav__list}>
              <li className={styles.nav__item}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${styles.nav__link} ${isActive ? styles.active : ''}`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li className={styles.nav__item}>
                <NavLink
                  to="/phones"
                  className={({ isActive }) =>
                    `${styles.nav__link} ${isActive ? styles.active : ''}`
                  }
                >
                  Phones
                </NavLink>
              </li>

              <li className={styles.nav__item}>
                <NavLink
                  to="/tablets"
                  className={({ isActive }) =>
                    `${styles.nav__link} ${isActive ? styles.active : ''}`
                  }
                >
                  Tablets
                </NavLink>
              </li>

              <li className={styles.nav__item}>
                <NavLink
                  to="/accessories"
                  className={({ isActive }) =>
                    `${styles.nav__link} ${isActive ? styles.active : ''}`
                  }
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.right}>
          <NavLink
            to="/favorites"
            className={`${styles.icon} ${styles.mobileAction}`}
          >
            <span className={styles.iconWrapper}>
              <img src="/img/icons/favourites.svg" alt="favorites" />
              <span className={styles.badge}>12</span>
            </span>
          </NavLink>

          <NavLink
            to="/cart"
            className={`${styles.icon} ${styles.iconShoppingBag}`}
          >
            <span className={styles.iconWrapper}>
              <img src="/img/icons/shopping-bag.svg" alt="shopping-bag" />
              <span className={styles.badge}>5</span>
            </span>
          </NavLink>
        </div>

        <button
          type="button"
          className={`${styles.icon} ${styles.burgerButton}`}
          onClick={() => setIsMenuOpen(prev => !prev)}
        >
          <img
            src={
              isMenuOpen ? '/img/icons/close.svg' : '/img/icons/menu-burger.svg'
            }
            alt="menu"
          />
        </button>
      </header>
      {isMenuOpen && (
        <aside className={`${styles.mobileMenu}`}>
          <nav className={`${styles.mobileNav}`}>
            <ul className={`${styles.mobileNavList} ${styles.nav__list}`}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${styles.nav__link} ${isActive ? styles.active : ''}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/phones"
                  className={({ isActive }) =>
                    `${styles.nav__link} ${isActive ? styles.active : ''}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Phones
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/tablets"
                  className={({ isActive }) =>
                    `${styles.nav__link} ${isActive ? styles.active : ''}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tablets
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/accessories"
                  className={({ isActive }) =>
                    `${styles.nav__link} ${isActive ? styles.active : ''}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className={styles.mobileActions}>
            <NavLink
              to="/favorites"
              className={`${styles.icon} ${styles.mobileAction}`}
            >
              <span className={styles.iconWrapper}>
                <img src="/img/icons/favourites.svg" alt="favorites" />
                <span className={styles.badge}>3</span>
              </span>
            </NavLink>

            <NavLink
              to="/cart"
              className={`${styles.icon} ${styles.mobileAction}`}
            >
              <span className={styles.iconWrapper}>
                <img src="/img/icons/shopping-bag.svg" alt="cart" />
                <span className={styles.badge}>3</span>
              </span>
            </NavLink>
          </div>
        </aside>
      )}
    </>
  );
};
