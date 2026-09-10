import { Button } from '@/shared/components/Button';
import styles from './Cart.module.scss';
import { CartItem } from './components/CartItem';
import { useState } from 'react';
import { Modal } from '@/shared/components/Modal';
import { useCartDispatch } from '@/shared/hooks/useCartDispatch';
import { Divider } from '@/shared/components/Divider';
import { SavedProduct } from '@/types/SavedProduct';

interface Props {
  products: SavedProduct[];
}

export const Cart = ({ products }: Props) => {
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const cartDispatch = useCartDispatch();

  const totals = products.reduce(
    (acc, item) => ({
      price: acc.price + item.product.price * item.quantity,
      amount: acc.amount + item.quantity,
    }),
    { price: 0, amount: 0 },
  );

  const handleCheckoutModalOpen = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleCheckoutModalClose = () => {
    setIsCheckoutModalOpen(false);
  };

  const handleCartClear = () => {
    cartDispatch([]);
    setIsCheckoutModalOpen(false);
  };

  const Empty = (
    <div className={styles.emptyMessageContainer}>
      <h2 className={styles.emptyMessage}>Your cart is empty</h2>
      <img
        src="img/cart-is-empty.png"
        alt="Empty cart image"
        className={styles.emptyMessageImg}
      />
    </div>
  );

  const CartContent = (
    <div className={styles.cart}>
      <div className={styles.list}>
        {products.map(({ id, product, quantity }) => (
          <CartItem
            key={id}
            id={id}
            category={product.category}
            itemId={product.itemId}
            imgURL={product.image}
            title={product.name}
            price={product.price * quantity}
            amount={quantity}
          />
        ))}
      </div>

      <div className={styles.total}>
        <div className={styles.priceDetails}>
          <h2 className={styles.totalPrice}>${totals.price}</h2>
          <p className={styles.itemsCount}>Total for {totals.amount} items</p>
        </div>

        <Divider />

        <Button text="Checkout" size="m" onClick={handleCheckoutModalOpen} />
      </div>
    </div>
  );

  return (
    <>
      {products.length === 0 ? Empty : CartContent}
      <Modal isOpen={isCheckoutModalOpen}>
        <div className={styles.checkoutModalContent}>
          <p className={styles.checkoutModalMessage}>
            {'Checkout is not implemented.\n Do you want to clear the Cart?'}
          </p>

          <div className={styles.checkoutModalButtons}>
            <Button text="Confirm" onClick={handleCartClear} />
            <Button text="Close" onClick={handleCheckoutModalClose} />
          </div>
        </div>
      </Modal>
    </>
  );
};
