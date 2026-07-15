import classNames from 'classnames';
import styles from './CartPage.module.scss';
import { useLocation } from 'react-router-dom';
import { Back } from '../shared/components/Back';
import { useCartDispatch, useCartState } from '../shared/store/CartContext';
import { CartList } from './components/CartList';
import { CartSummary } from './components/CartSummary';
import { useCallback, useMemo, useState } from 'react';
import { EmptyState } from '../shared/components/EmptyState';
import { Modal } from '../shared/components/Modal';

export const CartPage = () => {
  const state = useCartState();
  const dispatch = useCartDispatch();
  const location = useLocation();
  const backLink = location.state?.from || '/';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
  const handleModalClose = useCallback(() => setIsModalOpen(false), []);
  const handleConfirmOrder = useCallback(() => {
    dispatch({ type: 'clearCart' });
    setIsModalOpen(false);
  }, [dispatch]);

  const cartData = useMemo(
    () =>
      state.cartItems.reduce(
        (acc, cur) => ({
          quantity: acc.quantity + cur.quantity,
          totalPrice: acc.totalPrice + cur.product.price * cur.quantity,
        }),
        { quantity: 0, totalPrice: 0 },
      ),
    [state.cartItems],
  );

  return (
    <div className={classNames(styles['catalog-page'], 'container')}>
      <Back backLink={backLink} />

      <h1 className={styles['catalog-page__title']}>Сart</h1>

      {cartData.quantity > 0 ? (
        <div className={styles['catalog-page__info']}>
          <CartList cartItems={state.cartItems} />
          <CartSummary
            totalPrice={cartData.totalPrice}
            quantity={cartData.quantity}
            handleCheckout={handleModalOpen}
          />
          <Modal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onConfirm={handleConfirmOrder}
            title={
              'Checkout is not implemented yet. ' +
              'Do you want to clear the Cart?'
            }
          />
        </div>
      ) : (
        <EmptyState
          className={'container'}
          title="Your cart is empty"
          actionText={'Go buy'}
          imageSrc="img/cart-is-empty.png"
        />
      )}
    </div>
  );
};
