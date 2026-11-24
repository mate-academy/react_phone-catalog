import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { useState } from 'react';
import { useIconLinks } from '../../hooks/useIconLinks';
import { navItems } from '../../constants/navItems';
import { BurgerMenu } from '../BurgerMenu';

export const Header = () => {
  const iconLinks = useIconLinks();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <Link to="/" className={styles.header__logo} onClick={closeMenu}>
          <img
            src="images/icons/logo.png"
            alt="Nice Gadgets Logo"
            className={styles.header__img}
          />
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            {navItems.map(item => (
              <li key={item.to} className={styles.nav__item}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.nav__link} ${styles.nav__linkActive}`
                      : styles.nav__link
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.header__actions}>
          {iconLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? `${styles.header__icon} ${styles.header__iconActive}`
                  : styles.header__icon
              }
            >
              <span className={styles.header__iconWrap}>
                <img
                  src={link.icon}
                  alt={link.label}
                  className={styles.header__image}
                />
                {link.count > 0 && (
                  <span className={styles.header__count}>{link.count}</span>
                )}
              </span>
            </NavLink>
          ))}

          <button
            type="button"
            className={styles.header__burger}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(prev => !prev)}
          >
            <img
              src={
                isMenuOpen
                  ? 'images/icons/close.png'
                  : 'images/icons/burger-menu.png'
              }
              alt=""
              className={styles.header__image}
            />
          </button>
        </div>
      </div>

      {isMenuOpen && <BurgerMenu onClose={closeMenu} />}
    </header>
  );
};
