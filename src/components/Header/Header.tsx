import { AnimatePresence, motion } from 'motion/react';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import { mobileMenuSlide } from '../../animations/animations';

const navLinks = [
  { path: '/', label: 'HOME' },
  { path: '/phones', label: 'PHONES' },
  { path: '/tablets', label: 'TABLETS' },
  { path: '/accessories', label: 'ACCESSORIES' },
];

export const Header = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(`uppercase ${styles.link}`, {
      [styles.isActive]: isActive,
    });

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const favItems = useSelector((state: RootState) => state.favorites.items);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <nav className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <img
            src="./../../../public/icons/logo.png"
            alt="Logo"
            width="80"
            height="28"
          />
        </div>
        <ul className={styles.list}>
          {navLinks.map(({ path, label }) => (
            <li key={path} className={styles.item}>
              <NavLink
                to={path}
                className={getLinkClass}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <ul className={styles.right}>
        <button className={styles.burger} onClick={toggleMenu}>
          {isMenuOpen ? (
            <img
              src="./../../../public/icons/close-icon.svg"
              alt="close button"
            />
          ) : (
            <img src="/icons/burger-button.svg" alt="menu" />
          )}
        </button>

        <NavLink
          to="/favorites"
          className={styles.icon}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className={styles.wrapper}>
            <img src="/icons/favorite-icon.svg" alt="Favorite Page" />
            {favItems.length > 0 && (
              <span className={styles.badge}>{favItems.length}</span>
            )}
          </div>
        </NavLink>
        <NavLink
          to="/shopping-cart"
          className={styles.icon}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className={styles.wrapper}>
            <img src="/icons/shopping_bag-icon.svg" alt="Shopping Cart" />
            {cartItems.length > 0 && (
              <span className={styles.badge}>{cartItems.length}</span>
            )}
          </div>
        </NavLink>
      </ul>

      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.nav
            variants={mobileMenuSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={styles.mobile}
          >
            <ul className={styles.mobileList}>
              {navLinks.map(({ path, label }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    onClick={() => {
                      toggleMenu();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={getLinkClass}
                  >
                    <p>{label}</p>
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className={styles.footer}>
              <NavLink
                to="/favorites"
                className={styles.footerIcon}
                onClick={() => {
                  toggleMenu();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className={styles.wrapper}>
                  <img src="/icons/favorite-icon.svg" alt="Favorite Page" />
                  {favItems.length > 0 && (
                    <span className={styles.badge}>{favItems.length}</span>
                  )}
                </div>
              </NavLink>

              <NavLink
                to="/shopping-cart"
                className={styles.footerIcon}
                onClick={() => {
                  toggleMenu();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className={styles.wrapper}>
                  <img src="/icons/shopping_bag-icon.svg" alt="Shopping Cart" />
                  {cartItems.length > 0 && (
                    <span className={styles.badge}>{cartItems.length}</span>
                  )}
                </div>
              </NavLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </nav>
  );
};
