import { FC } from 'react';

import { CartEmpty } from './cart-empty/CartEmpty';
import { CartItem } from './cart-item/CartItem';
import { CartSummary } from './cart-summary/CartSummary';
import { BackArrow } from '@ui/button/arrow/BackArrow';

import { useCart } from '@hooks/useCart';

import styles from './cart.module.scss';

export const Cart: FC = () => {
  const { cartItems } = useCart();

  const hasItemsInCart = !!cartItems.length;

  return (
    <>
      {hasItemsInCart ? (
        <section className={styles.page}>
          <BackArrow />

          <h2>Cart</h2>

          <div className={styles.content}>
            <div className={styles.items}>
              {cartItems.map(item => (
                <CartItem
                  key={item.product.id}
                  item={item.product}
                  quantity={item.quantity}
                />
              ))}
            </div>

            <CartSummary />
          </div>
        </section>
      ) : (
        <CartEmpty />
      )}
    </>
  );
};
