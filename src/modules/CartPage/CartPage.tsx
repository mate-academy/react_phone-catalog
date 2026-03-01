import React, { useState } from 'react';
import styles from './CartPage.module.scss';
import { BackButton } from '../shared/BackButton';
import { PrimaryButton } from '../shared/PrimaryButton';
import { useCart } from '../../hooks/useCart';
import { CartItem } from './components/CartItem';
import { ConfirmModal } from './components/ConfirmModal';

const modalMessage =
  'Checkout is not implemented yet. Do you want to clear the Cart?';

export const CartPage = () => {
  const { cart, removeFromCart, changeQuantity, resetCart } = useCart();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const allPrice = cart?.reduce((acc, item) => {
    return acc + item.quantity * item.product.price;
  }, 0);

  const allQuantity = cart?.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const handleQuantity = (value: string, index: number) => {
    const item = cart[index];
    const id = item.id;

    const quantityItem =
      value === 'increase' ? item.quantity + 1 : item.quantity - 1;

    changeQuantity(id, quantityItem);
  };

  const handleRemoveProduct = (index: number) => {
    const item = cart[index];
    const id = item.id;

    removeFromCart(id);
  };

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  const handleConfirm = () => {
    resetCart();
    setIsOpenModal(false);
  };

  const handleCheckout = () => {
    setIsOpenModal(true);
  };

  return (
    <main className={styles.main}>
      <BackButton />
      <h2 className={styles.main__title}>Cart</h2>
      <div className={styles.container}>
        {cart.length === 0 ? (
          <p className={styles.text}>Your cart is empty</p>
        ) : (
          <>
            <div className={styles.wrapper}>
              {cart.map((product, index) => (
                <CartItem
                  key={product.id}
                  product={product}
                  index={index}
                  handleRemoveProduct={handleRemoveProduct}
                  handleQuantity={handleQuantity}
                />
              ))}
            </div>
            <div className={styles.productPrice}>
              <div className={styles.priceTotal}>
                <p className={styles.priceTotal__value}>{`$${allPrice}`}</p>
                <p
                  className={styles.priceTotal__quantity}
                >{`Total for ${allQuantity} items`}</p>
              </div>
              <div className={styles.verticalLine}> </div>
              <PrimaryButton
                text="Checkout"
                cardPage={true}
                onClick={handleCheckout}
              />
            </div>
          </>
        )}
      </div>
      <ConfirmModal
        isOpen={isOpenModal}
        text={modalMessage}
        onClose={handleCancel}
        onConfirm={handleConfirm}
      />
    </main>
  );
};
