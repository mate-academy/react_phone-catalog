import React from 'react';
import styles from '@/pages/Cart/Cart.module.scss';
import { CustomModal } from '@/shared/components/CustomModal/CustomModal';
import { Button } from '@/shared/ui/button/Button';
import { useCartProducts } from './hooks/useCartProducts';
import { useAppDispatch } from '@/store/hooks';
import { clearCart } from '@/store/slices/cartSlice';

const CartCheckoutBox = () => {
  const { totalAmount, isEmpty } = useCartProducts();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const handleClose = () => setIsModalOpen(prev => !prev);

  if (isEmpty) {
    return null;
  }

  return (
    <>
      <div className={styles.cartPage__checkoutBlock}>
        <div className={styles.cartPage__checkoutBlockPriceWrapper}>
          <span className={styles.cartPage__checkoutBlockPrice}>
            ${totalAmount}
          </span>
          <span className={styles.cartPage__checkoutBlockAmount}>
            {`Total for ${totalAmount} items`}
          </span>
        </div>
        <Button onClick={handleClose}>Checkout</Button>
      </div>
      {isModalOpen && (
        <CustomModal
          onClose={handleClose}
          onCheckout={() => {
            dispatch(clearCart());
            handleClose();
          }}
          modalBody={
            <p>
              Checkout is not implemented yet. Do you want to clear the Cart?
            </p>
          }
        />
      )}
    </>
  );
};

export default CartCheckoutBox;
