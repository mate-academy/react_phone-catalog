import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

import logo from '../../../assets/Logo.png';
import Favourites from '../../../assets/Favourites (Heart Like).svg?react';
import Cart from '../../../assets/Shopping bag (Cart).svg?react';
import BurgerMenu from '../../../assets/Menu.svg?react';

import styles from './Header.module.scss';
import { useApp } from '../../../providers/context';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, favouritesCount } = useApp();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 639) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo" className={styles.header__logo} />

      <nav className={styles.header__nav}>
        <ul className={styles.header__list}>
          <li>
            <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to="/phones">
              Phones
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to="/tablets">
              Tablets
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to="/accessories"
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.header__icons}>
        <NavLink to="/favorites">
          <Favourites className={styles.header__icon} />
          {favouritesCount > 0 && <div className={styles.header__counter}>{favouritesCount}</div>}
        </NavLink>

        <NavLink to="/cart">
          <Cart className={styles.header__icon} />
          {cartCount > 0 && <div className={styles.header__counter}>{cartCount}</div>}
        </NavLink>
      </div>

      <div className={styles.header__burger}>
        <button className={styles.header__button} onClick={() => setIsMenuOpen(prev => !prev)}>
          <BurgerMenu className={styles.header__icon} />
        </button>
      </div>

      <div className={`${styles.burgerMenu} ${isMenuOpen ? styles.burgerMenu__open : ''}`}>
        <ul className={styles.burgerMenu__list}>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to="/"
              onClick={closeMenu}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to="/phones"
              onClick={closeMenu}
            >
              Phones
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to="/tablets"
              onClick={closeMenu}
            >
              Tablets
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to="/accessories"
              onClick={closeMenu}
            >
              Accessories
            </NavLink>
          </li>
        </ul>

        <div className={styles.burgerMenu__icons}>
          <div className={styles.burgerMenu__container}>
            <NavLink to="/favorites" onClick={closeMenu}>
              <Favourites className={styles.burgerMenu__icon} />
              {favouritesCount > 0 && (
                <div className={styles.header__counter}>{favouritesCount}</div>
              )}
            </NavLink>
          </div>

          <div className={styles.burgerMenu__container}>
            <NavLink to="/cart" onClick={closeMenu}>
              <Cart className={styles.burgerMenu__icon} />
              {cartCount > 0 && <div className={styles.header__counter}>{cartCount}</div>}
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};
