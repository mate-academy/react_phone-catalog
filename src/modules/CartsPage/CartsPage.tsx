import { useNavigate } from 'react-router-dom';
import styles from './CartsPage.module.scss';
import { CartItems } from '../../types/Product';
import React from 'react';
import { CartItem } from './components/CartItem';

type Props = {
  carts: CartItems[];
  onRemove: (id: string) => void;
  onDecrease: (id: string) => void;
  onIncrease: (id: string) => void;
};

export const CartsPage: React.FC<Props> = ({
  carts,
  onRemove,
  onDecrease,
  onIncrease,
}) => {
  const navigate = useNavigate();
  const totalQuantity = carts.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  const totalPrice = carts.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  return (
    <main className={styles.main}>
      <div className={styles.back}>
        <img
          src="/img/icon/chevron-arrow-left.svg"
          alt="Arrow Left"
          className={styles.backIcon}
        />
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      <h1 className={styles.title}>Cart</h1>

      <div className={styles.cartContent}>
        <div className={styles.list}>
          {carts.map(cart => (
            <CartItem
              key={cart.id}
              cart={cart}
              onRemove={onRemove}
              onDecrease={onDecrease}
              onIncrease={onIncrease}
            />
          ))}
        </div>

        <div className={styles.summary}>
          <div className={styles.summaryContent}>
            <p className={styles.summaryPrice}>{`$${totalPrice}`}</p>
            <p className={styles.summaryText}>
              {`Total for ${totalQuantity} items`}
            </p>
          </div>
          <div className={styles.summaryAction}>
            <button className={styles.checkoutButton}>Checkout</button>
          </div>
        </div>
      </div>
    </main>
  );
};
