import cn from 'classnames';
import styles from './Header.module.scss';
import logo from '../../assets/icons/logo.svg';
import heartIcon from '../../assets/icons/heart-icon.svg';
import cartIcon from '../../assets/icons/cart-icon.svg';

import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { menuItems } from '../../data/menuData';
import { BurgerMenu } from '../Buttons/BurgerMenu';

type GetNavLinkClass = (
  base: string,
  active: string,
  addition?: string,
) => ({ isActive }: { isActive: boolean }) => string;

export const getNavLinkClass: GetNavLinkClass = (base, active, addition) => {
  return ({ isActive }) => {
    return cn(base, { [active]: isActive }, addition);
  };
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__left}>
          <Link to="/" className={styles.header__logo}>
            <img src={logo} alt="Logo" />
          </Link>

          {/* main nav */}
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
          <NavLink to="#" className={styles.header__heart_btn}>
            <img src={heartIcon} alt="Add to favourite" />
          </NavLink>
          <NavLink to="#" className={styles.header__cart_btn}>
            <img src={cartIcon} alt="Add to cart" />
          </NavLink>

          <BurgerMenu isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>
      </div>

      {/* mobile menu */}

      {isMenuOpen && (
        <div
          className={`${styles.mobile__menu} ${isMenuOpen ? styles.open : ''}`}
        >
          <ul className={styles.mobile__menu_list}>
            {menuItems.map(item => (
              <li key={item.id} className={styles.mobile__menu_item}>
                <NavLink
                  to={item.path}
                  className={getNavLinkClass(
                    styles.nav__link,
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
      )}
    </header>
  );
};
