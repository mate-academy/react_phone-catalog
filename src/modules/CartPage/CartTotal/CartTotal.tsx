import React from 'react';
import styles from './CartTotal.module.scss';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { useDispatch } from 'react-redux';
import { clearCart } from '../../../services/cart';

const MySwal = withReactContent(Swal);

interface Props {
  totalPrice: number;
  totalQuantity: number;
}

export const CartTotal: React.FC<Props> = ({ totalPrice, totalQuantity }) => {
  const dispatch = useDispatch();
  const handleCheckout = () => {
    MySwal.fire({
      title: (
        <p className={styles.checkoutTitle}>
          Checkout is not implemented yet. Do you want to clear the Cart?
        </p>
      ),
      icon: 'warning',
      background: '#161827',
      showCancelButton: true,
      confirmButtonColor: '#905bff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, clear!',
    }).then(result => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: <p className={styles.checkoutTitle}>Cart has been cleared</p>,
          icon: 'success',
          background: '#161827',
        });

        dispatch(clearCart());
      }
    });
  };

  return (
    <div className={styles.total}>
      <div className={styles.total__priceWrapper}>
        <h2 className={styles.total__price}>${totalPrice}</h2>
        <span className={styles.total__text}>
          Total for {totalQuantity} items
        </span>
      </div>
      <button className={styles.total__checkout} onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};
