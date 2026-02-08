import { NavLink } from 'react-router-dom';
import logo from '../../../assets/Logo.png';
import Favourites from '../../../assets/Favourites (Heart Like).svg?react';
import Cart from '../../../assets/Shopping bag (Cart).svg?react';
import BurgerMenu from '../../../assets/Menu.svg?react';
import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import { useApp } from '../../../providers/context';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, favouritesCount } = useApp();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 639 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <img src={logo} alt="Logo" className={styles.header__logo} />
        <nav className={styles.header__nav}>
          <ul className={styles.header__list}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/phones">Phones</NavLink>
            </li>
            <li>
              <NavLink to="/tablets">Tablets</NavLink>
            </li>
            <li>
              <NavLink to="/accessories">Accessories</NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.header__icons}>
          <NavLink to="/favorites">
            <Favourites className={styles.header__icon} />
            <div className={styles.header__counter}>{favouritesCount}</div>
          </NavLink>
          <NavLink to="/cart">
            <Cart className={styles.header__icon} />
            <div className={styles.header__counter}>{cartCount}</div>
          </NavLink>
        </div>
        <div className={styles.header__burger}>
          <button className={styles.header__button} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <BurgerMenu className={styles.header__icon} />
          </button>
        </div>
        <div className={styles.burgerMenu + (isMenuOpen ? ' ' + styles.burgerMenu__open : '')}>
          <ul className={styles.burgerMenu__list}>
            <li>
              <NavLink onClick={closeMenu} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink onClick={closeMenu} to="/phones">
                Phones
              </NavLink>
            </li>
            <li>
              <NavLink onClick={closeMenu} to="/tablets">
                Tablets
              </NavLink>
            </li>
            <li>
              <NavLink onClick={closeMenu} to="/accessories">
                Accessories
              </NavLink>
            </li>
          </ul>
          <div className={styles.burgerMenu__icons}>
            <div className={styles.burgerMenu__container}>
              <NavLink to="/favorites" onClick={closeMenu}>
                <Favourites className={styles.burgerMenu__icon} />
                <div className={styles.header__counter}>{favouritesCount}</div>
              </NavLink>
            </div>
            <div className={styles.burgerMenu__container}>
              <NavLink to="/cart" onClick={closeMenu}>
                <Cart className={styles.burgerMenu__icon} />
                <div className={styles.header__counter}>{cartCount}</div>
              </NavLink>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
