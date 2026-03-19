import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import icons from '../../assets/icons/icons.svg';
import logoDark from '../../assets/images/Logo-phone-version.svg';
import logoLight from '../../assets/images/Logo.svg';

import styles from './Header.module.scss';
import { MobileMenu } from '../MobileMenu';
import { ProductsContext } from '../../store/ProductsContext';
import CartIcon from '../Counter/Counter';
import { useTheme } from '../../store/ThemeContext';
import { SearchInput } from '../SearchInput';

const getNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.headerNavLink} ${styles.active}` : styles.headerNavLink;

const getNavLinkFav = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? `${styles.headerFavouriteBtn} ${styles.active}`
    : styles.headerFavouriteBtn;

const getNavLinkCart = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? `${styles.headerCartIcon} ${styles.active}`
    : styles.headerCartIcon;

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, favorites } = useContext(ProductsContext);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const handleToggleMenu = () => setIsOpen(!isOpen);

  const isCategoryPage = ['/phones', '/tablets', '/accessories'].includes(
    location.pathname,
  );

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const favoritesCount = favorites.length;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLogoWrap}>
          <Link className={styles.logoHeader} to="/">
            <img src={theme === 'light' ? logoLight : logoDark} alt="Logo" />
          </Link>
        </div>

        <nav className={styles.headerNav}>
          <NavLink to="/" className={getNavLinkClassName}>
            Home
          </NavLink>
          <NavLink to="/phones" className={getNavLinkClassName}>
            Phones
          </NavLink>
          <NavLink to="/tablets" className={getNavLinkClassName}>
            Tablets
          </NavLink>
          <NavLink to="/accessories" className={getNavLinkClassName}>
            Accessories
          </NavLink>
        </nav>

        <div className={styles.HeaderMenuWrapper}>
          {!isOpen ? (
            <div className={styles.headerMenuIcon} onClick={handleToggleMenu}>
              <svg className={styles.icon}>
                <use href={`${icons}#icon-burger-menu`} />
              </svg>
            </div>
          ) : (
            <div className={styles.headerCloseIcon} onClick={handleToggleMenu}>
              <svg className={styles.icon}>
                <use href={`${icons}#icon-close-menu`} />
              </svg>
            </div>
          )}

          {isCategoryPage && (
            <SearchInput
              key={location.pathname}
              category={location.pathname.slice(1)}
            />
          )}

          <button
            className={styles.themeToggleBtn}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <svg className={styles.icon} width="20" height="20">
              <use
                href={
                  theme === 'light' ? `${icons}#icon-sun` : `${icons}#icon-moon`
                }
              />
            </svg>
          </button>

          <NavLink to="/catalog" className={getNavLinkFav}>
            <svg className={styles.icon}>
              <use href={`${icons}#header-icon-header`} />
            </svg>
            <CartIcon itemCount={favoritesCount} />
          </NavLink>

          <NavLink to="/cart" className={getNavLinkCart}>
            <svg className={styles.icon}>
              <use href={`${icons}#shopping-bag-icon`} />
            </svg>
            <CartIcon itemCount={itemCount} />
          </NavLink>
        </div>
      </header>

      <MobileMenu isOpen={isOpen} onClose={handleToggleMenu} />
    </>
  );
};
