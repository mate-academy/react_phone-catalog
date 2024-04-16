import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames';

import { AsideMenu } from './components/AsideMenu';
import { icons } from '../global/Icons';
import { Navbar } from '../../components/Navbar';
import { menuItems } from '../../helpers/constArrs';
import { useAppSelector } from '../../app/hook';

export const Header = () => {
  const { favourites } = useAppSelector(state => state.favourites);
  const { cartItem } = useAppSelector(state => state.cartItems);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.iconLink, {
      [styles.active]: isActive,
    });

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
              <span className={styles.favCount}>{cartItem.length}</span>
            )}
          </NavLink>
        </div>

        <button
          type="button"
          aria-label="side-menu"
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
