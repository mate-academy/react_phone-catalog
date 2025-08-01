import { useState } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Button } from '../../components/Button';
import { CartItemContainer } from '../../components/CartItemContainer';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';
import CartIsEmptyImage from '../../../public/img/cart-is-empty.png';

export const CartPage = () => {
  const { cartItems, cartTotalItemsCount, cartTotalPrice, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    clearCart();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs />
      </div>

      <h1 className={styles.page__title}>Cart</h1>

      {!cartItems.length ? (
        <div className={styles.page__empty}>
          <p className={styles.page__error}>Your cart is empty</p>
          <img className={styles.page__image} src={CartIsEmptyImage} alt="empty cart" />
        </div>
      ) : (
        <div className={styles.page__container}>
          <div className={styles.page__cartContainer}>
            {cartItems.map(item => (
              <div key={item.product?.id} className={styles.page__item}>
                <CartItemContainer item={item} />
              </div>
            ))}
          </div>

          <div className={styles.page__checkoutContainer}>
            <div className={styles.page__checkoutContainerTop}>
              <p className={styles.page__checkoutPrice}>${cartTotalPrice}</p>
              <p className={styles.page__text}>Total for {cartTotalItemsCount} items</p>
            </div>

            <div className={styles.line}></div>

            <div className={styles.page__checkoutContainerButtom}>
              <Button option={'primary'} className={styles.button} onClick={handleModal}>
                Checkout
              </Button>

              {isModalOpen && (
                <div className={styles.modalOverlay}>
                  <div className={styles.modalOverlay__modal}>
                    <p className={styles.modalOverlay__title}>
                      Checkout is not implemented yet. Do you want to clear the Cart?
                    </p>
                    <div className={styles.modalOverlay__modalButtons}>
                      <button className={styles.modalOverlay__button} onClick={handleConfirm}>
                        Confirm
                      </button>
                      <button className={styles.modalOverlay__button} onClick={handleCancel}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
