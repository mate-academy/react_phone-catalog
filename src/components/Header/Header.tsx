import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';
import { useContext, useEffect, useState } from 'react';
import { Navigation } from './components/Navigation/Navigation';
import { ProductContext } from '../../store/ProductContext';

export const Header = () => {
  const { cart, favs } = useContext(ProductContext);
  const [scrolled, setScrolled] = useState(false);

  const cartCount = cart.length;
  const favsCount = favs.length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles['header--scrolled'] : ''}`}
    >
      <div className={styles.header__container}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `${styles.header__logo} ${styles['header__logo--active']}`
              : styles.header__logo
          }
        >
          <img
            src="/public/img/header/header__logo.png"
            alt="nice gadgets logo"
            className={styles.header__img}
          />
        </NavLink>

        <Navigation />

        <div className={styles.header__links}>
          <NavLink
            to="/cart"
            style={{ '--count': `"${cartCount}"` } as React.CSSProperties}
            className={({ isActive }) =>
              isActive
                ? `${styles.header__link} ${styles['header__link--active']}`
                : styles.header__link
            }
          >
            <img
              src={
                cart.length
                  ? '/public/img/icons/cart-counter.svg'
                  : '/img/icons/cart-empty.svg'
              }
              alt="Cart"
              className={styles.header__icon}
            />
          </NavLink>
          <NavLink
            to="/favourites"
            style={{ '--count': `"${favsCount}"` } as React.CSSProperties}
            className={({ isActive }) =>
              isActive
                ? `${styles.header__link} ${styles['header__link--active']}`
                : styles.header__link
            }
          >
            <img
              src={
                favs.length
                  ? '/public/img/icons/favs-counter.svg'
                  : '/img/icons/favs.svg'
              }
              alt="Cart"
              className={styles.header__icon}
            />
          </NavLink>
        </div>
      </div>
    </header>
  );
};
