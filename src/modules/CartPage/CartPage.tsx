import type React from 'react';
import { asset } from '../../helper';
import { useCart } from '../../context/CartContext';
import { ButtonBack } from '../shared/components/ButtonBack';
import { CartItemDetails } from './components/CartItemDetails';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const {
    items,
    totalCount,
    totalPrice,
    changeQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    if (
      window.confirm(
        'Checkout is not implemented yet. Do you want to clear the Cart?',
      )
    ) {
      clearCart();
    }
  };

  return (
    <div className={styles['cart-page']}>
      <ButtonBack />
      <h1 className={styles.title}>Cart</h1>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <img src={asset('img/empty-cart.png')} alt="Empty Cart" />
        </div>
      ) : (
        <div className={styles.content}>
          <ul className={styles.list}>
            {items.map(item => (
              <li key={item.id}>
                <CartItemDetails
                  item={item}
                  onQuantityChange={changeQuantity}
                  onRemove={removeFromCart}
                />
              </li>
            ))}
          </ul>

          <div className={styles.summary}>
            <p className={styles.total}>${totalPrice}</p>
            <p className={styles['total-label']}>
              Total for {totalCount} {totalCount === 1 ? 'item' : 'items'}
            </p>
            <div className={styles.divider} />
            <button
              type="button"
              className={styles.checkout}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
