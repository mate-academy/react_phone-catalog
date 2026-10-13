import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { useShopContext } from '../../context/ShopContext';
import styles from './Header.module.scss';
import React from 'react';

const FAVORITES_PATH =
  'M14.6667 4.79336C14.6667 7.0267 11.96 9.87336 8 ' +
  '13.3334C4.04 9.87336 1.33333 7.0267 1.33333 4.79336C1.33333 ' +
  '2.92003 2.80667 1.44003 4.66667 1.44003C5.74667 1.44003 ' +
  '6.78667 1.95336 7.42667 2.7667L8 3.47336L8.57333 ' +
  '2.7667C9.21333 1.95336 10.2533 1.44003 11.3333 1.44003C13.1933 ' +
  '1.44003 14.6667 2.92003 14.6667 4.79336Z';

const CART_PATH =
  'M5.33333 4.66667V3.33333C5.33333 1.86 6.52667 0.666667 8 ' +
  '0.666667C9.47333 0.666667 10.6667 1.86 10.6667 3.33333V4.66667M2.66667 ' +
  '4.66667H13.3333L14 14H2L2.66667 4.66667Z';

const CLOSE_PATH = 'M13 1L1 13M1 1L13 13';
const BURGER_PATH = 'M1 1H15M1 7H15M1 13H15';

export const Header = () => {
  const { cartItems, favorites } = useShopContext();
  const { pathname } = useLocation();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const favCount = favorites.length;

  const navRef = useRef<HTMLElement>(null);
  const [sliderStyle, setSliderStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => {
      if (navRef.current) {
        const activeLink = navRef.current.querySelector(
          `.${styles.active}`,
        ) as HTMLElement;

        if (activeLink) {
          setSliderStyle({
            left: activeLink.offsetLeft,
            width: activeLink.offsetWidth,
            opacity: 1,
          });
        } else {
          setSliderStyle(prev => ({ ...prev, opacity: 0 }));
        }
      }
    }, 50);
  }, [pathname]);

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.navLink, { [styles.active]: isActive });

  const getIconClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.iconBlock, { [styles.activeIcon]: isActive });

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <Link to="/" className={styles.logoLink}>
            {/* Убрали начальный слеш в пути к логотипу */}
            <img
              src="img/logo.svg"
              alt="Nice Gadgets Logo"
              className={styles.logo}
            />
          </Link>

          <nav className={styles.nav} ref={navRef}>
            <div
              className={styles.navSlider}
              style={{
                transform: `translateX(${sliderStyle.left}px)`,
                width: `${sliderStyle.width}px`,
                opacity: sliderStyle.opacity,
              }}
            />
            <NavLink to="/" className={getNavClass}>
              Home
            </NavLink>
            <NavLink to="/phones" className={getNavClass}>
              Phones
            </NavLink>
            <NavLink to="/tablets" className={getNavClass}>
              Tablets
            </NavLink>
            <NavLink to="/accessories" className={getNavClass}>
              Accessories
            </NavLink>
          </nav>
        </div>

        <div className={styles.right}>
          <NavLink
            to="/favorites"
            className={getIconClass}
            aria-label="Favorites"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={FAVORITES_PATH}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {favCount > 0 && <span className={styles.badge}>{favCount}</span>}
          </NavLink>

          <NavLink to="/cart" className={getIconClass} aria-label="Cart">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={CART_PATH}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </NavLink>

          <button
            className={styles.burgerBtn}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={CLOSE_PATH}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={BURGER_PATH}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      <aside
        className={cn(styles.mobileMenu, {
          [styles.open]: isMenuOpen,
        })}
      >
        <nav className={styles.mobileNav}>
          <NavLink to="/" className={getNavClass}>
            Home
          </NavLink>
          <NavLink to="/phones" className={getNavClass}>
            Phones
          </NavLink>
          <NavLink to="/tablets" className={getNavClass}>
            Tablets
          </NavLink>
          <NavLink to="/accessories" className={getNavClass}>
            Accessories
          </NavLink>
        </nav>

        <div className={styles.mobileIcons}>
          <NavLink
            to="/favorites"
            className={getIconClass}
            aria-label="Favorites"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={FAVORITES_PATH}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {favCount > 0 && <span className={styles.badge}>{favCount}</span>}
          </NavLink>

          <NavLink to="/cart" className={getIconClass} aria-label="Cart">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={CART_PATH}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </NavLink>
        </div>
      </aside>
    </>
  );
};
