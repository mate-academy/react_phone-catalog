import React from "react";
import styles from './Cart.module.scss';
import { useNavigate } from "react-router-dom";
import BackArrow from '../../icons/arrows/Active_left.png'

export const Cart: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.cart}>
      <div className={styles.cart__back} onClick={() => navigate(-1)}>
        <img src={BackArrow} alt="Back" className={styles.cart__back__icon} />
        <p className={styles.cart__back__text}>Back</p>
      </div>

      <h2 className={styles.cart__title}>Cart</h2>
    </div>
  )
}
