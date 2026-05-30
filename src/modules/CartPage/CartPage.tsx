import { useMemo } from 'react';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../utils/format';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const {
    items,
    changeQuantity,
    removeFromCart,
    totalAmount,
    totalQuantity,
    clearCart,
  } = useCart();

  const canCheckout = items.length > 0;
  const handleCheckout = () => {
    if (
      !window.confirm(
        'Checkout is not implemented yet. Do you want to clear the Cart?',
      )
    ) {
      return;
    }

    clearCart();
  };

  const quantityText = useMemo(
    () => `${totalQuantity} item${totalQuantity === 1 ? '' : 's'}`,
    [totalQuantity],
  );

  if (!items.length) {
    return (
      <div className={styles.empty}>
        <img src="/img/cart-is-empty.png" alt="" />
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <main className={styles.page}>
      <h1>Cart</h1>
      <div className={styles.summary}>
        <span>{quantityText}</span>
        <span>{formatCurrency(totalAmount)}</span>
      </div>
      <div className={styles.list}>
        {items.map(item => {
          const product = item.product;
          const price =
            product.price ?? product.priceDiscount ?? product.priceRegular ?? 0;

          return (
            <div key={item.id} className={styles.item}>
              <img
                className={styles.image}
                src={product.image ?? product.images?.[0]}
                alt={product.name}
              />
              <div className={styles.content}>
                <h2>{product.name}</h2>
                <div className={styles.meta}>
                  {formatCurrency(price)} x {item.quantity}
                </div>
                <div className={styles.controls}>
                  <button
                    type="button"
                    onClick={() => changeQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => changeQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                type="button"
                className={styles.remove}
                onClick={() => removeFromCart(item.id)}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className={styles.checkout}
        onClick={handleCheckout}
        disabled={!canCheckout}
      >
        Checkout
      </button>
    </main>
  );
};
