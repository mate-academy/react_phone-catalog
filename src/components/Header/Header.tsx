import React, { useEffect, useState } from 'react';
import { NavLink, Link } from "react-router-dom";
import styles from './Header.module.scss';
import LogoIcon from '../../img/icons/LogoIcon.svg';
import cartIcon from '../../img/icons/CartIcon.svg';
import LogoIconDT from '../../img/icons/LogoIcon--DarkTheme.svg';
import cartIconDT from '../../img/icons/CartIcon--DarkTheme.svg';
import crossIcon from '../../img/icons/CrossIcon--DarkTheme.svg';
import crossIconDT from '../../img/icons/CrossIcon.svg';
import favIcon from '../../img/icons/FavoritesIcon.svg';
import favIconDT from '../../img/icons/FavoritesIcon--DarkTheme.svg';
import menuIcon from '../../img/icons/MenuIcon.svg';
import menuIconDT from '../../img/icons/MenuIcon--DarkTheme.svg';
import { Theme } from '../Theme';
import { MobileMenu } from '../MobileMenu';
import { useAppContext } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { theme, productsInCartCount, favoriteProducts, isMobMenuOpen, setIsMobMenuOpen, sortMethod, numberOfProductsPerPage } = useAppContext();
  const [cartCount, setCartCount] = useState<number>(0)

  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = isMobMenuOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflowX = '';
      document.body.style.overflowY = '';
    };
  }, [isMobMenuOpen]);

  const handleMenu = () => {
    setIsMobMenuOpen(!isMobMenuOpen);
  }

  useEffect(() => {
    let cartCount: number = 0;

    for (let i = 0; i < productsInCartCount.length; i++) {
      cartCount = cartCount + productsInCartCount[i]
    }

    setCartCount(cartCount)

  }, [productsInCartCount]);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        <img
          src={`${theme === 'dark' ? LogoIconDT : LogoIcon}`}
          alt="Nice Gadgets Logo"
          className={styles.logo}
        />
      </Link>

      <div className={styles.container}>
        <nav className={styles.nav}>
          <NavLink to="/" exact className={styles.navItem} activeClassName={styles.isActive}>
            Home
          </NavLink>

          <NavLink to={{pathname: "/phones", search: `?sort=${sortMethod}&perPage=${numberOfProductsPerPage}`}} className={styles.navItem} activeClassName={styles.isActive}>
            Phones
          </NavLink>

          <NavLink to={{pathname: "/tablets", search: `?sort=${sortMethod}&perPage=${numberOfProductsPerPage}`}} className={styles.navItem} activeClassName={styles.isActive}>
            Tablets
          </NavLink>

          <NavLink to={{pathname: "/accessories", search: `?sort=${sortMethod}&perPage=${numberOfProductsPerPage}`}} className={styles.navItem} activeClassName={styles.isActive}>
            Accessories
          </NavLink>
        </nav>

        <div className={styles.actionsContainer}>
          <div className={styles.actions}>
            <NavLink to="/favorites" className={styles.actionItem} activeClassName={styles.isActive}>
              <div className={styles.actionIcon}>
                <img
                  src={`${theme === 'dark' ? favIconDT : favIcon}`}
                  alt="Favorites"
                  className={styles.icon}
                />
              </div>
              <div className={`${favoriteProducts.length > 0 ? styles.count : styles.hidden}`}>
                <div className={styles.countText}>
                  {favoriteProducts.length}
                </div>
              </div>
            </NavLink>

            <NavLink to="/cart" className={styles.actionItem} activeClassName={styles.isActive}>
              <div className={styles.actionIcon}>
                <img
                  src={`${theme === 'dark' ? cartIconDT : cartIcon}`}
                  alt="Cart"
                  className={styles.icon}
                />
              </div>

              <div className={`${cartCount > 0 ? styles.count : styles.hidden}`}>
                <div className={styles.countText}>
                  {cartCount}
                </div>
              </div>
            </NavLink>

            <div className={styles.actionItem}>
              <Theme />
            </div>

            <div className={`${isMobMenuOpen ? styles.menu : styles.hidden}`} onClick={handleMenu}>
              <img
                  src={`${theme === 'dark' ? crossIconDT : crossIcon}`}
                  alt="Menu"
                  className={styles.icon}
              />
            </div>

            <div className={`${!isMobMenuOpen ? styles.menu : styles.hidden}`} onClick={handleMenu}>
              <img
                  src={`${theme === 'dark' ? menuIconDT : menuIcon}`}
                  alt="Menu"
                  className={styles.icon}
              />
            </div>

            <div className={`${isMobMenuOpen ? styles.menuVisible : styles.menuHidden}`}>
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
