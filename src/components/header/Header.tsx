import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import { Navbar } from '../navbar';
import { AsideMenu } from './components/AsideMenu/AsideMenu';
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ProductInfo } from '../../types/ProductInfo';
import { AppContext } from '../../store/context';
import { ProductWithQuantity } from '../../types/ProductWithQuantity';
import { ProductSearch } from '../productSearch';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    likedProducts,
    setLikedProducts,
    selectedProducts,
    setSelectedProducts,
  } = useContext(AppContext);

  const location = useLocation();
  const isProductsList =
    location.pathname === '/phones' ||
    location.pathname === '/tablets' ||
    location.pathname === '/accessories';

  useEffect(() => {
    const selectedProductFromStorage = localStorage.getItem('likedProducts');

    if (selectedProductFromStorage) {
      const parsedProducts: ProductInfo[] = JSON.parse(
        selectedProductFromStorage,
      );

      if (JSON.stringify(parsedProducts) !== JSON.stringify(likedProducts)) {
        setLikedProducts(parsedProducts);
      }
    }
  }, [likedProducts, setLikedProducts]);

  useEffect(() => {
    const selectedProductFromStorage = localStorage.getItem('selectedProducts');

    if (selectedProductFromStorage) {
      const parsedProducts: ProductWithQuantity[] = JSON.parse(
        selectedProductFromStorage,
      );

      if (JSON.stringify(parsedProducts) !== JSON.stringify(selectedProducts)) {
        setSelectedProducts(parsedProducts);
      }
    }
  }, [selectedProducts, setSelectedProducts]);

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
                  {selectedProducts[0].quantity}
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
