import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { useShop } from '../../context/ShopContext';
import { Logo } from '../Logo';
import { IconCart, IconClose, IconHeart, IconMenu } from '../Icons';
import styles from './Header.module.scss';
import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { title: 'Home', to: '/' },
  { title: 'Phones', to: '/phones' },
  { title: 'Tablets', to: '/tablets' },
  { title: 'Accessories', to: '/accessories' },
] as const;

export const Header = () => {
  const { favorites, cart } = useShop();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalQuantity = cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const navlinkClassName = ({ isActive }: { isActive: boolean }) =>
    cn(styles.navLink, { [styles.navLinkActive]: isActive });

  const iconLinkClassName = ({ isActive }: { isActive: boolean }) =>
    cn(styles.cell, styles.iconLink, { [styles.iconLinkActive]: isActive });

  const menuLinkClassName = ({ isActive }: { isActive: boolean }) =>
    cn(styles.menuNavLink, { [styles.menuNavLinkActive]: isActive });

  const menuIconClassName = ({ isActive }: { isActive: boolean }) =>
    cn(styles.menuBottomLink, { [styles.menuBottomLinkActive]: isActive });

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <Logo className={styles.logo} />

          <nav className={styles.nav} aria-label="Main navigation">
            {NAV_ITEMS.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={navlinkClassName}
              >
                {item.title}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className={styles.right}>
          <NavLink
            to="/favorites"
            className={iconLinkClassName}
            aria-label="Favorites"
          >
            <span className={styles.iconWrapper}>
              <IconHeart />

              {favorites.length > 0 && (
                <span className={styles.badge}>{favorites.length}</span>
              )}
            </span>
          </NavLink>

          <NavLink to="/cart" className={iconLinkClassName} aria-label="Cart">
            <span className={styles.iconWrapper}>
              <IconCart />

              {totalQuantity > 0 && (
                <span className={styles.badge}>{totalQuantity}</span>
              )}
            </span>
          </NavLink>

          <button
            type="button"
            className={cn(styles.cell, styles.burger)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen(prev => !prev)}
          >
            {isMenuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </header>

      <aside
        className={cn(styles.menu, { [styles.menuOpen]: isMenuOpen })}
        aria-hidden={!isMenuOpen}
      >
        <nav className={styles.menuNav} aria-label="Mobile navigation">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={menuLinkClassName}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.title}
            </NavLink>
          ))}
        </nav>

        <div className={styles.menuBottom}>
          <NavLink
            to="/favorites"
            className={menuIconClassName}
            aria-label="Favorites"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className={styles.iconWrapper}>
              <IconHeart />

              {favorites.length > 0 && (
                <span className={styles.badge}>{favorites.length}</span>
              )}
            </span>
          </NavLink>

          <NavLink
            to="/cart"
            className={menuIconClassName}
            aria-label="Cart"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className={styles.iconWrapper}>
              <IconCart />

              {totalQuantity > 0 && (
                <span className={styles.badge}>{totalQuantity}</span>
              )}
            </span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};
