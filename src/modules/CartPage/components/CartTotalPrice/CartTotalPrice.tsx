import React, { useContext } from 'react';
import { CartStateContext } from '../../../../shared/store/CartProvider';
import styles from './CartTotalPrice.module.scss';

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CartTotalPrice: React.FC<Props> = ({ setIsModalOpen }) => {
  const cartsProduct = useContext(CartStateContext);

  const totalPrice =
    Array.isArray(cartsProduct) &&
    cartsProduct.length > 0 &&
    cartsProduct.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );

  const totalItems =
    Array.isArray(cartsProduct) &&
    cartsProduct.length > 0 &&
    cartsProduct.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={styles.cart__totalPrice}>
      <ul className={styles.cart__listItems}>
        <li className={styles.cart__listItemPrice}>${totalPrice}</li>
        <li
          className={styles.cart__listItemInfo}
        >{`Total for ${totalItems} items`}</li>
      </ul>
      <span className={styles.cart__line}></span>
      <button
        className={styles.cart__checkout}
        onClick={() => setIsModalOpen(true)}
      >
        Checkout
      </button>
    </div>
  );
};
