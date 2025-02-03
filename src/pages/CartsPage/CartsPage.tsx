import React from 'react';
import styles from './CartsPage.module.scss';
import { useProductsContext } from '../../hooks/savedProducts';
import { useProducts } from '../../hooks/useProducts';
import emptyCart from '../../assets/images/cart-is-empty.png';
import { CartItems } from './components/CartItems/CartItems';
import { CartSummary } from './components/CartSummary';
import { Icon } from '../../components/Icon';
import { useNavigate } from 'react-router-dom';

export const CartsPage = () => {
  const { cartProducts } = useProductsContext();
  const { products } = useProducts();
  const navigate = useNavigate();

  const cartItems = products.filter(product =>
    cartProducts.includes(product.id),
  );

  return (
    <div className={styles.carts}>
      <div className={styles.carts__content}>
        <button className={styles.carts__back} onClick={() => navigate(-1)}>
          <div className={styles.carts__icon}>
            <Icon type="arrowPrev" />
          </div>

          <span className={styles.carts__btnText}>Back</span>
        </button>

        <h1 className={styles.carts__title}>Cart</h1>

        <div className={styles.carts__products}>
          {cartItems.length > 0 ? (
            <div className={styles.carts__wrapper}>
              <CartItems />
              <CartSummary />
            </div>
          ) : (
            <h2 className={styles.carts__empty}>Your cart is empty</h2>
          )}
        </div>
      </div>

      {!cartItems.length && (
        <>
          <div>
            <img
              src={emptyCart}
              alt="Empty cart"
              className={styles.carts__emptyImage}
            />
          </div>
        </>
      )}
    </div>
  );
};
