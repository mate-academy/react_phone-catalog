// NavBar.tsx (полный файл для замены)

import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import Logo from 'assets/icons/Logo.svg?react';
import BurgerMenuIcon from 'assets/icons/BurgerMenuIcon.svg?react';
import CloseIcon from '@/assets/icons/CloseIcon.svg?react';

import styles from './NavBar.module.scss';

import { FavouritesIconWithCounter } from '@/components/UI/IconWithCounter/FavouritesIconWithCounter';
import { CartIconWithCounter } from '@/components/UI/IconWithCounter/CartIconWithCounter';
import cn from 'classnames';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';

import { ThemeSwitcher } from '@/components/UI/ThemeSwitcher';
import { SearchComponent } from '@/components/UI/SearchComponent';

import productsList from 'data/api/products.json';
import { useMediaQuery } from '@/hooks/useMediaQuery';

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

export const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const isTablet = useMediaQuery('(min-width: 640px)');
  const pageRef = useRef<HTMLDivElement>(null);
  const { favorites } = useFavorites();
  const { cart } = useCart();

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

  useEffect(() => {
    setIsSearchExpanded(false);
  }, [isTablet]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSelect = (itemId: string) => {
    console.log('Selected itemId:', itemId);
  };

  const actionsClasses = cn(styles.navbar__actions, {
    [styles.searchActive]: isSearchExpanded,
  });

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

        {isTablet ? (
          <div className={actionsClasses}>
            <SearchComponent
              products={productsList}
              onSelect={handleSelect}
              onToggleExpand={setIsSearchExpanded}
            />
            <div className={styles.iconWrapper}>
              <ThemeSwitcher />
            </div>
            <div className={styles.iconWrapper}>
              <FavouritesIconWithCounter
                favouritesCount={favorites.length}
                isMobile={false}
              />
            </div>
            <div className={styles.iconWrapper}>
              <CartIconWithCounter cartCount={cart.length} isMobile={false} />
            </div>
          </div>
        ) : (
          <div className={styles.navbar__wrapperMobileActions}>
            <SearchComponent
              products={productsList}
              onSelect={handleSelect}
              onToggleExpand={setIsSearchExpanded}
            />
            <button
              onClick={toggleMenu}
              className={styles.navbar__burgerIcon}
              aria-label="Open menu"
            >
              <BurgerMenuIcon className={styles.navbar__icon} />
            </button>
          </div>
        )}
      </div>

      <aside
        className={`${styles.navbar__menu} ${isMenuOpen ? styles.navbar__menuOpen : ''}`}
        id="menu"
      >
        <div className={styles.navbar__menuHeader}>
          <Link to="/home" className={styles.navbar__logo}>
            <Logo className={styles.navbar__logoIcon} />
          </Link>

          <div className={styles.navbar__wrapperMobileActionsAside}>
            <ThemeSwitcher />
            <button
              onClick={toggleMenu}
              className={styles.navbar__closeIcon}
              aria-label="Close menu"
            >
              <CloseIcon className={styles.navbar__icon} />
            </button>
          </div>
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
            favouritesCount={favorites.length}
            isMobile={true}
            onClick={() => setIsMenuOpen(false)}
          />
          <CartIconWithCounter
            cartCount={cart.length}
            isMobile={true}
            onClick={() => setIsMenuOpen(false)}
          />
        </div>
      </aside>
    </div>
  );
};

