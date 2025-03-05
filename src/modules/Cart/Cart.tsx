/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import styles from './Cart.module.scss';
import { Back } from '../ProductDetails/components/Back';
import { CartItems } from './components/CartItems';
import { CartContext } from '../../context/CartContext';
import { MainContext } from '../../context/MainContext';
import { Total } from './components/Total';
import { EmptyCart } from './components/EmptyCart';

export const Cart: React.FC = () => {
  // #region context

  const { cart } = useContext(CartContext);
  const { isDesktop, setIsFooterAbsPos, scrollToTopHandler } =
    useContext(MainContext);

  // #endregion

  const cartValues = Object.values(cart);
  const footerAbsPosCondition = isDesktop
    ? cartValues.length < 3
    : cartValues.length === 0;

  useEffect(() => {
    scrollToTopHandler(0);
  }, []);

  useEffect(() => {
    if (footerAbsPosCondition) {
      setIsFooterAbsPos(true);
    } else {
      setIsFooterAbsPos(false);
    }
  }, [footerAbsPosCondition]);

  return (
    <section className={styles.cart}>
      <Back />
      <h2 className={styles.title}>Cart</h2>
      <div className={styles.wrapper}>
        <CartItems />
        {cartValues.length > 0 ? <Total /> : <EmptyCart />}
      </div>
    </section>
  );
};
