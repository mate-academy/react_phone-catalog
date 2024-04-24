import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames';

import { AsideMenu } from './components/AsideMenu';
import { icons } from '../global/Icons';
import { Navbar } from '../../components/Navbar';
import { allowedPaths, menuItems } from '../../helpers/constArrs';
import { useAppSelector } from '../../app/hook';
import { SearchBar } from './components/SearchBar';

export const Header = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { favourites } = useAppSelector(state => state.favourites);
  const { cartItem } = useAppSelector(state => state.cartItems);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.iconLink, {
      [styles.active]: isActive,
    });

  const isSearchVisible = () => {
    return allowedPaths.includes(location.pathname);
  };

  useEffect(() => {
    if (cartItem) {
      const count = cartItem.reduce((total, item) => total + item.quantity, 0);
      setCartItemCount(count);
    }
  }, [cartItem]);

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Link to="/" className={styles.logoLink}>
          {icons.logo}
        </Link>

        <nav className={styles.navbar}>
          <Navbar links={menuItems} customStyle={styles.navLinks} />
        </nav>
      </div>

      <div className={styles.headerRight}>
        {isSearchVisible() && <SearchBar />}

        <div className={styles.iconTabl}>
          <NavLink
            to="favourites"
            className={({ isActive }) => getLinkClass({ isActive })}
          >
            {icons.favourites}

            {favourites.length > 0 && (
              <span className={styles.favCount}>{favourites.length}</span>
            )}
          </NavLink>

          <NavLink
            to="cart"
            className={({ isActive }) => getLinkClass({ isActive })}
          >
            {icons.cart}

            {cartItem.length > 0 && (
              <span className={styles.favCount}>{cartItemCount}</span>
            )}
          </NavLink>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className={classNames(styles.iconLink, styles.iconMob)}
        >
          {icons.menu}
        </button>
      </div>

      <AsideMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </header>
  );
};
