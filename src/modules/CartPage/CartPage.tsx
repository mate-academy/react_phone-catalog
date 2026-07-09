import React from 'react';
import { CartItem } from './CartItem';
import { CartTotal } from './CartTotal';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '../../components/ui/ArrowLeftIcon';
import cartIsEmpty from '../../../public/img/cart-is-empty.png';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  return (
    <div className={styles.cart}>
      <button onClick={() => navigate(-1)} className={styles.cart__back}>
        <ArrowLeftIcon />
        Back
      </button>
      <h1 className={styles.cart__title}>Cart</h1>

      {cartItems.length === 0 ? (
        <div className={styles.cart__emptyContent}>
          <h2 className={styles.cart__emptyText}>Your cart is empty</h2>
          <img
            src={cartIsEmpty}
            alt="Cart is empty"
            className={styles.cart__emptyImage}
          />
        </div>
      ) : (
        <>
          <div className={styles.cart__list}>
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className={styles.cart__summary}>
            <CartTotal />
          </div>
        </>
      )}
    </div>
  );
};
