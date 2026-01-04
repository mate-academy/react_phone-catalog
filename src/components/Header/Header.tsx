import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import Logo from './icons/Logo.png';
import HeartIcon from './icons/heart-icon.png';
import CartIcon from './icons/cart-icon.png';
import BurgerMenu from './icons/burger-menu-icon.png';
import CloseMenu from '../../icons/remove_icon.png';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { Menu } from './Menu';

export const Header: React.FC = () => {
  const { cartItems } = useShoppingCart();
  const { favItems } = useFavorites();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__container}>
          <div className={styles.header__container__left}>
            <div className={styles.header__logo}>
              <NavLink to="/">
                <img src={Logo} alt="Logo" className={styles.header__logo__img} />
              </NavLink>
            </div>

            <nav className={`${styles.header__nav} ${isMenuOpen ? styles.header__nav_active : ''}`}>
              <NavLink to="/" className={styles.header__nav__item} onClick={() => setIsMenuOpen(false)}>
                HOME
              </NavLink>
              <NavLink to="/phones" className={styles.header__nav__item} onClick={() => setIsMenuOpen(false)}>
                PHONES
              </NavLink>
              <NavLink to="/tablets" className={styles.header__nav__item} onClick={() => setIsMenuOpen(false)}>
                TABLETS
              </NavLink>
              <NavLink to="/accessories" className={styles.header__nav__item} onClick={() => setIsMenuOpen(false)}>
                ACCESSORIES
              </NavLink>
            </nav>
          </div>

          <div className={styles.header__container__right}>
            <div className={styles.header__icons__icon}>
              <NavLink to="/favorites">
                <div className={styles.header__icons__wrapper}>
                  <img
                    src={HeartIcon}
                    alt="Favorites"
                    className={styles.header__icons__img}
                  />
                  {favItems.length > 0 && (
                    <div className={styles.header__icons__amount}>
                      {favItems.length}
                    </div>
                  )}
                </div>
              </NavLink>
            </div>

            <div className={styles.header__icons__icon}>
              <NavLink to="/cart">
                <div className={styles.header__icons__wrapper}>
                  <img
                    src={CartIcon}
                    alt="Cart"
                    className={styles.header__icons__img}
                  />
                  {cartItems.length > 0 && (
                    <div className={styles.header__icons__amount}>
                      {totalItems}
                    </div>
                  )}
                </div>
              </NavLink>
            </div>
          </div>

          <button className={styles.header__burger} onClick={toggleMenu}>
            <img
              className={styles.header__burger__img}
              src={isMenuOpen ? CloseMenu : BurgerMenu}
              alt="Menu"
            />
          </button>
        </div>
      </header>

      {isMenuOpen && <Menu onClose={() => setIsMenuOpen(false)} />}
    </>
  );
};
