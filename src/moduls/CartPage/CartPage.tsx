import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DispatchContext, StateContext } from '../../Provider/GadgetsContext';

import classNames from 'classnames';

import { CartItem } from '../../features/CartItem';
import { PrimaryButton } from '../../shared/components/PrimaryButton';

import cartIsEmpty from '../../../public/img/cart-is-empty.png';

import styles from './CartPage.module.scss';
import { GoBackButton } from '../../shared/components/GoBackButton';

export const CartPage = () => {
  const { products, cart } = useContext(StateContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const dispatch = useContext(DispatchContext);
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  const visibleItems = cart
    .map(cartItem => {
      const product = products.find(p => p.itemId === cartItem.id);

      return product ? { ...product, quantity: cartItem.quantity } : null;
    })
    .filter(item => item !== null);

  const itemsAmount = visibleItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const sumAmount = visibleItems.reduce(
    (sum, item) => sum + item?.quantity * item?.price,
    0,
  );

  const handleOpenModal = () => setIsCheckout(true);
  const handleCloseModal = () => setIsCheckout(false);
  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    handleCloseModal();
  };

  return (
    <main
      className={classNames(styles.cartPage, {
        [styles.cartPage__isCheckout]: isCheckout,
      })}
    >
      <div className="page-container">
        <GoBackButton onClick={handleGoBack} />
        <h1 className={styles.cartPage__title}>Cart</h1>
        {cart.length > 0 ? (
          <div className={styles.cartPage__bottom}>
            <div className={styles.cartPage__itemList}>
              {visibleItems.length > 0 &&
                visibleItems.map(item => (
                  <CartItem key={item?.itemId} item={item} />
                ))}
            </div>

            <div className={styles.checkoutBlock}>
              <h3>${sumAmount}</h3>
              <p>Total for {itemsAmount} items</p>
              <hr className={styles.checkoutBlock__line} />
              <PrimaryButton mainText="Checkout" onClick={handleOpenModal} />
            </div>
          </div>
        ) : (
          <img src={cartIsEmpty} alt="" className={styles.cartIsEmpty} />
        )}
      </div>

      <div
        className={classNames(styles.overlay, { [styles.show]: isCheckout })}
        onClick={handleCloseModal}
      >
        <aside className={styles.modal} onClick={e => e.stopPropagation()}>
          <h3>Checkout is not implemented yet.</h3>
          <h4>Do you want to clear the Cart?</h4>
          <div className={styles.modal__buttons}>
            <PrimaryButton
              className={styles.modal__clear}
              mainText="Clear"
              onClick={handleClearCart}
            />
            <PrimaryButton
              className={styles.modal__cancel}
              mainText="Cancel"
              onClick={handleCloseModal}
            />
          </div>
        </aside>
      </div>
    </main>
  );
};
