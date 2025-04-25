import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import styles from './CartPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';

import { Product } from '../../types/product';
import { RootState } from '../../store';
import CartItem from '../../components/CartItem/CartItem';

const CartPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState<Product[]>([]);
  const cartProducts = useSelector((state: RootState) => state.cartProducts);

  useEffect(() => {
    const calculatedTotal = cartProducts.reduce((acc, item) => {
      return acc + item.priceRegular * item.quantity;
    }, 0);

    setTotalPrice(calculatedTotal);
    console.log();
  }, [cartProducts.map(item => item.quantity).join(','), cartProducts]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart') || '[]';

    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {}
    }
  }, [cartProducts]);

  if (!cart.length) {
    return (
      <div className={styles.cartPage}>
        <Breadcrumb type="cart" />
        <h1 className={styles.cartPage__title}>Cart</h1>
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.cartPage}>
          <Breadcrumb type="cart" />
          <h1 className={styles.cartPage__title}>Cart</h1>
        </div>
        <div className={styles.cartPage__content}>
          <div className={styles.cartPage__items}>
            {cart.map(item => {
              return <CartItem key={item.id} product={item} />;
            })}
          </div>
          <div className={styles.cartPage__total}>
            <h2 className={styles.cartPage__price}>${totalPrice}</h2>
            <p
              className={styles.cartPage__text}
            >{`Total for ${cart.length} items`}</p>
            <div className={styles.cartPage__separator}></div>
            <button
              className={`${styles.cartPage__button} ${styles.cartPage__add}`}
            >
              Checkout
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default CartPage;
