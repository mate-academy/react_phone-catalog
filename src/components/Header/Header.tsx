import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import { MobileMenu } from '../MobileMenu/MobileMenu';

export const Header = () => {
  const cartContext = useContext(CartContext);
  const favoritesContext = useContext(FavoritesContext);

  if (!cartContext) {
    return null;
  }

  const { cart } = cartContext;
  const totalAmount = cart.reduce((sum, item) => sum + item.amount, 0);

  if (!favoritesContext) {
    return null;
  }

  return (
    <>
      <header className={styles.header} id="top">
        <div className={styles.container}>
          <div className={styles.header__content}>
            <a href="#" className={styles.header__logo}>
              <img src="/img/icons/logo.svg"></img>
            </a>

            <nav className={`${styles.header__nav}`}>
              <ul className={styles.nav__list}>
                <li className="nav__item">
                  <Link to="/" className={styles.nav__link}>
                    home
                  </Link>
                </li>
                <li className="nav__item">
                  <Link to="/phones" className={styles.nav__link}>
                    phones
                  </Link>
                </li>
                <li className="nav__item">
                  <Link to="/tablets" className={styles.nav__link}>
                    tablets
                  </Link>
                </li>
                <li className="nav__item">
                  <Link to="/accessories" className={styles.nav__link}>
                    accessories
                  </Link>
                </li>
              </ul>
            </nav>

            <div className={styles.header__icons}>
              <Link to="/favorites" className={styles.icon}>
                <img src="../../public/img/icons/heart.svg" />
                {favorites.length > 0 && (
                  <span className={styles['favourites-count']}>
                    {favorites.length}
                  </span>
                )}
              </Link>

              <Link to="/cart" className={styles.icon}>
                <img src="../../public/img/icons/cart.svg" />
                {cart.length > 0 && (
                  <span className={styles['cart-count']}>{totalAmount} </span>
                )}
              </Link>

              <a
                href="#"
                onClick={() => setIsMenuOpen(true)}
                className={`${styles.icon} ${styles['icon--burger-menu']} `}
              >
                <img src="../../public/img/icons/menu.svg" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
    </>
  );
};
