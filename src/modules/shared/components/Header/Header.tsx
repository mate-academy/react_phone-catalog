import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { useState } from 'react';
import { BurgerMenu } from './BurgerMenu';
import { useCart } from '../../hooks/useCart';

export const Header = () => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const { totalQuantity } = useCart();

  return (
    <>
      <header className={styles.header}>
        <div>
          <Link
            to="/"
            className={styles.logoLink}
            onClick={() => setIsBurgerMenuOpen(false)}
          >
            <img
              src="/img/logo.png"
              alt="Logo Nice Gadgets"
              className={styles.logo}
            />
          </Link>
        </div>

        <nav className={styles.nav}>
          <div className={styles.navLinks}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Home
            </NavLink>
            <NavLink
              to={{ pathname: '/phones' }}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Phones
            </NavLink>
            <NavLink
              to={{ pathname: '/tablets' }}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Tablets
            </NavLink>
            <NavLink
              to={{ pathname: '/accessories' }}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Accessories
            </NavLink>
          </div>

          <div className={styles.icons}>
            <NavLink
              to={'/favorites'}
              className={({ isActive }) =>
                isActive
                  ? `${styles.iconLink} ${styles.active}`
                  : styles.iconLink
              }
            >
              <img src="/img/icons/heart.png" className={styles.icon}></img>
            </NavLink>
            <NavLink
              to={'/cart'}
              className={({ isActive }) =>
                isActive
                  ? `${styles.iconLink} ${styles.active}`
                  : styles.iconLink
              }
            >
              <div className={styles.cartBlock}>
                <img
                  src="/img/icons/shopping-cart.png"
                  className={styles.icon}
                ></img>
                {totalQuantity !== 0 && (
                  <span className={styles.totalQuantity}>{totalQuantity}</span>
                )}
              </div>
            </NavLink>
          </div>
          <div className={styles.iconsMobile}>
            <a
              href="#"
              className={styles.iconLink}
              onClick={() => setIsBurgerMenuOpen(val => !val)}
            >
              <img
                src={
                  isBurgerMenuOpen
                    ? '/img/icons/close.png'
                    : '/img/icons/menu.png'
                }
                className={styles.icon}
                alt="Menu icon"
              ></img>
            </a>
          </div>
        </nav>
      </header>
      <BurgerMenu
        isBurgerMenuOpen={isBurgerMenuOpen}
        onClose={() => setIsBurgerMenuOpen(false)}
      />
    </>
  );
};
