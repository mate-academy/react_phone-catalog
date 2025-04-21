import React from 'react';
import styles from './CartsPage.module.scss';
import { useProductsContext } from '../../hooks/savedProducts';
import { useProducts } from '../../hooks/useProducts';

export const CartsPage = () => {
  const { cartProducts } = useProductsContext();
  const { products } = useProducts();

  const cartItems = products.filter(product =>
    cartProducts.includes(product.id),
  );

  return (
    <div className={styles.cart}>
      <h1 className={styles.cart__title}>Carts page</h1>

      <div className={styles.cart__cards}>{cartItems && <div></div>}</div>
    </div>
  );
};
