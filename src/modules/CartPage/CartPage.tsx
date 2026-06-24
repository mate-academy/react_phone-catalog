import React, { useState } from 'react';
import { BackLink } from '../../components/BackLink';
import { CartItem } from '../../components/CartItem';
import { ConfirmModal } from '../../components/ConfirmModal';
import { getPublicUrl } from '../../utils/publicPath';
import { useCart } from '../shared/hooks/useCart';
import styles from './CartPage.module.scss';

const CHECKOUT_MESSAGE =
  'Checkout is not implemented yet. Do you want to clear the Cart?';

export const CartPage: React.FC = () => {
  const { cartItems, totalAmount, totalQuantity, clear } = useCart();
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const handleCheckoutClick = () => setConfirmOpen(true);
  const handleConfirm = () => {
    clear();
    setConfirmOpen(false);
  };

  const handleCancel = () => setConfirmOpen(false);

  return (
    <section className={styles.cartPage}>
      <div className={styles.cartPage__header}>
        <BackLink to="/" />
        <div>
          <h1 className={styles.cartPage__title}>Cart</h1>
        </div>
      </div>

      <div className={styles.cartPage__content}>
        <div className={styles.cartPage__list}>
          <ul className={styles.cartPage__items}>
            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <CartItem key={item.product.itemId} item={item} />
              ))
            ) : (
              <li className={styles.cartPage__empty}>
                <p className={styles.cartPage__emptyText}>Your cart is empty</p>
                <img
                  className={styles.cartPage__emptyImage}
                  src={getPublicUrl('img/cart-is-empty.png')}
                  alt=""
                />
              </li>
            )}
          </ul>
        </div>

        <aside className={styles.summary}>
          <div className={styles.summary__inner}>
            <div className={styles.summary__total}>
              <div className={styles.summary__amount}>
                $
                {totalAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                })}
              </div>
              <div className={styles.summary__label}>
                Total for {totalQuantity} item{totalQuantity > 1 ? 's' : ''}
              </div>
            </div>

            <button
              className={styles.summary__checkout}
              onClick={handleCheckoutClick}
            >
              Checkout
            </button>
          </div>
        </aside>
      </div>

      <ConfirmModal
        isOpen={isConfirmOpen}
        message={CHECKOUT_MESSAGE}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </section>
  );
};
