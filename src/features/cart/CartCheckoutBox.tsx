import React from 'react';
import styles from '@/pages/Cart/Cart.module.scss';
import { useCart } from '@/app/providers/CartContext';
import { CustomModal } from '@/shared/components/CustomModal/CustomModal';
import { Button } from '@/shared/ui/button/Button';
import { useCartProducts } from './hooks/useCartProducts';

const CartCheckoutBox = () => {
  const { totalCount, clearCart } = useCart();
  const { totalAmount, isEmpty } = useCartProducts();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleCheckout = () => setIsModalOpen(prev => !prev);

  if (isEmpty) return null;

  return (
    <>
      <div className={styles.cartPage__checkoutBlock}>
        <div className={styles.cartPage__checkoutBlockPriceWrapper}>
          <span className={styles.cartPage__checkoutBlockPrice}>
            ${totalAmount}
          </span>
          <span className={styles.cartPage__checkoutBlockAmount}>
            {`Total for ${totalCount} items`}
          </span>
        </div>
        <Button onClick={handleCheckout}>Checkout</Button>
      </div>
      {isModalOpen && (
        <CustomModal
          onClose={handleCheckout}
          onCheckout={clearCart}
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
