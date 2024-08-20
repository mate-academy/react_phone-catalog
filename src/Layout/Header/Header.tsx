import { Link, NavLink, useLocation } from 'react-router-dom';

import Button from '../../UI/Buttons/Button';
import { FaRegHeart } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import { LuSun } from 'react-icons/lu';
import { MobileMenu } from '../../modules/shared/BurgerMenu';
import { PiMoonBold } from 'react-icons/pi';
import { ROUTES } from '../../constants/ROUTES';
import { RxHamburgerMenu } from 'react-icons/rx';
import SearchField from '../../modules/shared/SearchField/SearchField';
import classNames from 'classnames';
import styles from './Header.module.css';
import { useCartStore } from '../../store/cartStore';
import useDarkThemeStore from '../../store/darkThemeStore';
import { useFavoritesStore } from '../../store/favoritesStore';
import { useState } from 'react';

const Header = () => {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const { pathname } = useLocation();

  const cart = useCartStore(state => state.cartItems);
  const favorites = useFavoritesStore(state => state.favorites);

  const { theme, toggleTheme } = useDarkThemeStore();

  const getLinkStatus = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.link, {
      [styles.activeLink]: isActive,
    });

  const getIconLinkStatus = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.iconLink, {
      [styles.activeLink]: isActive,
    });

  const isSearchShown =
    pathname === `/${ROUTES.PHONES}` ||
    pathname === `/${ROUTES.TABLETS}` ||
    pathname === `/${ROUTES.ACCESSORIES}` ||
    pathname === `/${ROUTES.FAVORITES}`;

  return (
    <header className={styles.header} id="header">
      <div className={styles.containerLeft}>
        <Link to={ROUTES.HOME} className={styles.logo}>
          <img
            src={`img/${theme === 'dark' ? 'logo-dark.svg' : 'logo.svg'}`}
            alt="Nice gadgets logo"
          />
        </Link>

        <MobileMenu isMenuShown={isMenuShown} setIsMenuShown={setIsMenuShown} />

        <nav
          className={styles.navigation}
          role="navigation"
          aria-label="main navigation"
        >
          <ul className={styles.list}>
            <li>
              <NavLink className={getLinkStatus} to={ROUTES.HOME}>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink className={getLinkStatus} to={ROUTES.PHONES}>
                Phones
              </NavLink>
            </li>

            <li>
              <NavLink className={getLinkStatus} to={ROUTES.TABLETS}>
                Tablets
              </NavLink>
            </li>

            <li>
              <NavLink className={getLinkStatus} to={ROUTES.ACCESSORIES}>
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.containerRight}>
        {isSearchShown && (
          <div className={styles.searchBtn}>
            <SearchField />
          </div>
        )}

        <Button
          variant="ghost"
          onClick={toggleTheme}
          className={styles.btnToggleTheme}
        >
          {theme === 'dark' ? <LuSun size={18} /> : <PiMoonBold size={18} />}
        </Button>

        <NavLink to={ROUTES.FAVORITES} className={getIconLinkStatus}>
          <Button size={[16, 16]}>
            <FaRegHeart size={16} />
            {!!favorites.length && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </Button>
        </NavLink>

        <NavLink to={ROUTES.CART} className={getIconLinkStatus}>
          <Button size={[16, 16]}>
            <FiShoppingBag size={16} />

            {!!cart.length && (
              <span className={styles.badge}>{cart.length}</span>
            )}
          </Button>
        </NavLink>

        <button onClick={() => setIsMenuShown(true)} className={styles.burger}>
          <RxHamburgerMenu size={16} />
        </button>
      </div>
    </header>
  );
};

export default Header;
