import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import Logo from 'assets/icons/Logo.svg?react';
import BurgerMenuIcon from 'assets/icons/BurgerMenuIcon.svg?react';
import CloseIcon from '@/assets/icons/CloseIcon.svg?react';

import styles from './NavBar.module.scss';

import { FavouritesIconWithCounter } from '@/components/UI/IconWithCounter/FavouritesIconWithCounter';
import { CartIconWithCounter } from '@/components/UI/IconWithCounter/CartIconWithCounter';
import cn from 'classnames';

type Props = {
  favouritesCount?: number;
  cartCount?: number;
};

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(styles.navbar__link, {
    [styles.navbar__link_active]: isActive,
  });

export const NavBar: React.FC<Props> = ({
  favouritesCount = 0,
  cartCount = 0,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.navbar} ref={pageRef}>
      <div className={styles.navbar__topBar}>
        <div className={styles.navbar__left}>
          <Link to="/home" className={styles.navbar__logo}>
            <Logo className={styles.navbar__logoIcon} />
          </Link>

          <nav className={styles.navbar__navigation}>
            <ul className={styles.navbar__list}>
              {navLinks.map(link => (
                <li key={link.to} className={styles.navbar__item}>
                  <NavLink to={link.to} className={getLinkClass}>
                    <h3>{link.label}</h3>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.navbar__actions}>
          <FavouritesIconWithCounter
            favouritesCount={favouritesCount}
            isMobile={false}
          />
          <CartIconWithCounter cartCount={cartCount} isMobile={false} />
        </div>

        <button
          onClick={toggleMenu}
          className={styles.navbar__burgerIcon}
          aria-label="Open menu"
        >
          <BurgerMenuIcon className={styles.navbar__icon} />
        </button>
      </div>

      <aside
        className={`${styles.navbar__menu} ${isMenuOpen ? styles.navbar__menuOpen : ''}`}
        id="menu"
      >
        <div className={styles.navbar__menuHeader}>
          <Link to="/home" className={styles.navbar__logo}>
            <Logo className={styles.navbar__logoIcon} />
          </Link>

          <button
            onClick={toggleMenu}
            className={styles.navbar__closeIcon}
            aria-label="Close menu"
          >
            <CloseIcon className={styles.navbar__icon} />
          </button>
        </div>

        <nav className={styles.navbar__menuNavigation}>
          <ul className={styles.navbar__menuList}>
            {navLinks.map(link => (
              <li key={link.to} className={styles.navbar__menuItem}>
                <NavLink
                  to={link.to}
                  className={styles.navbar__menuLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <h3>{link.label}</h3>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.navbar__mobileActions}>
          <FavouritesIconWithCounter
            favouritesCount={favouritesCount}
            isMobile={true}
          />
          <CartIconWithCounter cartCount={cartCount} isMobile={true} />
        </div>
      </aside>
    </div>
  );
};
