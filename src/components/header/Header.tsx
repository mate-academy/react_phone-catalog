import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import { Navbar } from '../navbar';
import { AsideMenu } from './components/AsideMenu/AsideMenu';
import { useState } from 'react';
import classNames from 'classnames';
import { ProductSearch } from '../productSearch';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { selectedProducts } = useAppSelector(
    (state: RootState) => state.basket,
  );

  const { likedProducts } = useAppSelector(
    (state: RootState) => state.favourite,
  );

  const location = useLocation();
  const isProductsList =
    location.pathname === '/phones' ||
    location.pathname === '/tablets' ||
    location.pathname === '/accessories';

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__left}>
          <Link to="/" className={styles.header__logo}>
            <img
              className={styles.header__logoimage}
              src="img/icons/main-logo.svg"
              alt="LOGO"
            />
          </Link>

          <Navbar onClick={() => setIsMenuOpen(false)} isOpen={false} />
        </div>

        <div className={styles.header__right}>
          <div className={styles.header__buttons}>
            {isProductsList && <ProductSearch />}

            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                classNames(styles.header__button, {
                  [styles.header__button_active]: isActive,
                })
              }
            >
              <img
                className={styles.header__button_image}
                src="img/icons/favourite.svg"
              />
              {likedProducts.length > 0 && (
                <div className={styles.header__infolabel}>
                  {likedProducts.length}
                </div>
              )}
            </NavLink>

            <NavLink
              to="/basket"
              className={({ isActive }) =>
                classNames(styles.header__button, {
                  [styles.header__button_active]: isActive,
                })
              }
            >
              <img
                className={styles.header__button_image}
                src="img/icons/cart.svg"
              />
              {selectedProducts.length > 0 && (
                <div className={styles.header__infolabel}>
                  {selectedProducts.length}
                </div>
              )}
            </NavLink>
          </div>

          <div
            onClick={() => setIsMenuOpen(true)}
            className={`${styles.header__button} ${styles.header__burger}`}
          >
            <img
              className={styles.header__button_image}
              src="img/icons/burger.svg"
              alt="menu"
            />
          </div>
        </div>
      </header>

      <AsideMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
};
