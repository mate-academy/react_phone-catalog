import { NavLink } from 'react-router-dom';
import { NavBarHeader } from '../../../../shared/ui/navBarHeader';
import styles from './BurgerMenuPage.module.scss';
import { useContext } from 'react';
// eslint-disable-next-line max-len
import { ProductsStateContext } from '../../../../shared/context/ProductsContext';
import { CartStateContext } from '../../../../shared/context/CartContext';

export const BurgerMenuPage = () => {
  const { products } = useContext(ProductsStateContext);
  const { cartItems } = useContext(CartStateContext);

  const favProductsQuantity = products.filter(product =>
    product.hasOwnProperty('isFavorite'),
  ).length;

  const cartProductsQuantity = cartItems
    .map(cartItem => cartItem.quantity)
    .reduce((sum, quantity) => sum + quantity, 0);

  return (
    <div className={styles.menuContent}>
      <main className={styles.menuMain}>
        <NavBarHeader className={`uppercase ${styles.navLinks}`} />
      </main>
      <footer className={styles.menuFooter}>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? styles.footerButtonActive : styles.footerButton
          }
        >
          <div className={styles.iconWrapper} data-count={favProductsQuantity}>
            <img
              className={styles.img}
              src={`img/icons/favorites.svg`}
              alt="Favorite"
            />
          </div>
        </NavLink>

        <NavLink to="/cart" className={styles.footerButton}>
          <div className={styles.iconWrapper} data-count={cartProductsQuantity}>
            <img className={styles.img} src={`img/icons/cart.svg`} alt="Cart" />
          </div>
        </NavLink>
      </footer>
    </div>
  );
};
