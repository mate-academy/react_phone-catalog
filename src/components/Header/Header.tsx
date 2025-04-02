import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ROUTES } from '@routes/index';
import { menuItems } from '@data/menuData';
import { BurgerMenu } from '../Buttons/BurgerMenu';
import { getNavLinkClass } from '@utils/getNavLinkClass';
import { HeartIcon } from '@components/Icons/HeartIcon';
import { useFavorites } from '@context/FavoritesContext';
import { useCart } from '@context/CartContext';
import { CartIcon } from '@components/Icons/CartIcon';

import styles from './Header.module.scss';
import logo from '@assets/icons/logo.svg';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { favorites } = useFavorites();
  const { cart } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.classList.add('no-scroll');
    } else {
      document.documentElement.classList.remove('no-scroll');
    }

    return () => {
      document.documentElement.classList.remove('no-scroll');
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__left}>
          <Link to={ROUTES.HOME} className={styles.header__logo}>
            <img src={logo} alt="Logo" />
          </Link>

          <nav className={styles.nav}>
            <ul className={styles.nav__list}>
              {menuItems.map(item => (
                <li key={item.id} className={styles.nav__item}>
                  <NavLink
                    to={item.path}
                    className={getNavLinkClass(
                      styles.nav__link,
                      styles['nav__link--active'],
                      'uppercase-text',
                    )}
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={styles.header__right}>
          <NavLink
            to={ROUTES.FAVORITES}
            className={getNavLinkClass(
              styles.header__heart_btn,
              styles['mobile__menu--active'],
            )}
          >
            <HeartIcon count={favorites.length} />
          </NavLink>
          <NavLink
            to={ROUTES.CART}
            className={getNavLinkClass(
              styles.header__cart_btn,
              styles['mobile__menu--active'],
            )}
          >
            <CartIcon count={cart.length} />
          </NavLink>

          <BurgerMenu isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>
      </div>

      <div
        className={`${styles.mobile__menu} ${isMenuOpen ? styles.open : ''}`}
      >
        <div className={styles.mobile__menu_top}>
          <ul className={styles.mobile__menu_list}>
            {menuItems.map(item => (
              <li key={item.id} className={styles.mobile__menu_item}>
                <NavLink
                  to={item.path}
                  className={getNavLinkClass(
                    styles.mobile__menu_link,
                    styles['nav__link--active'],
                    'uppercase-text',
                  )}
                  onClick={closeMenu}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.mobile__menu_bottom}>
          <NavLink
            to={ROUTES.FAVORITES}
            className={getNavLinkClass(
              styles.mobile__menu_favorite,
              styles['mobile__menu--active'],
            )}
            onClick={closeMenu}
          >
            <HeartIcon count={favorites.length} />
          </NavLink>
          <NavLink
            to={ROUTES.CART}
            className={getNavLinkClass(
              styles.mobile__menu_cart,
              styles['mobile__menu--active'],
            )}
            onClick={closeMenu}
          >
            <CartIcon count={cart.length} />
          </NavLink>
        </div>
      </div>
    </header>
  );
};
