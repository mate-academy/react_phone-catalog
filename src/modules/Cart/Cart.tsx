import { useCart } from '../../context/CartContext';
import { CartProduct } from './components/CartItem';
import styles from './Cart.module.scss';
import { BackLink } from '../shared/BackLink';
import { useEffect, useRef } from 'react';

export const Cart = () => {
  const { cart, totalPrice, totalItems } = useCart();
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    summaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, []);

  return (
    <section className={styles.cart}>
      <div className="inline-container">
        <BackLink className={styles.cart__backlink} />
        <h1 className={`page-title ${styles.cart__title}`}>Cart</h1>
        <div className={styles.cart__content}>
          <div className={styles.cart__list}>
            {cart.map(cartItem => (
              <CartProduct key={cartItem.product.id} item={cartItem} />
            ))}
          </div>
          <div ref={summaryRef} className={styles.summary}>
            <div className={styles.summary__info}>
              <span className={styles.summary__price}>${totalPrice}</span>
              <span className={styles.summary__items}>
                Total for {totalItems} items
              </span>
            </div>
            <div className="divider"></div>
            <div className="btn">Checkout</div>
          </div>
        </div>
      </div>
    </section>
  );
};
