import React, { useMemo, useState } from 'react';
import { Button } from '../../../../components/Button';
import { Modal } from '../Modal';
import styles from './CartCheckout.module.scss';
import { CartItem } from '../../../shared/types/Product';
import classNames from 'classnames';

interface Props {
  cartItems: CartItem[];
  clearCart: () => void;
}

export const CartCheckout: React.FC<Props> = ({ cartItems, clearCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalAmount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleConfirm = () => {
    clearCart();
    setIsModalOpen(false);
  };

  return (
    <div className={styles.payBlock}>
      <h2>{`$${totalAmount}`}</h2>

      <span className={classNames(styles.totalItemsText, 'body-text')}>
        {totalQuantity < 2 ? `Total for ${totalQuantity} item` : `Total for ${totalQuantity} items`}
      </span>

      <div className={styles.divider}></div>

      <Button
        variant="primary"
        className={styles.checkoutButton}
        onClick={() => setIsModalOpen(true)}
      >
        Checkout
      </Button>

      {isModalOpen && <Modal onConfirm={handleConfirm} onCancel={() => setIsModalOpen(false)} />}
    </div>
  );
};
