import { FC } from 'react';

import { CartEmpty } from './cart-empty/CartEmpty';
import { CartItem } from './cart-item/CartItem';
import { CartSummary } from './cart-summary/CartSummary';
import { BackArrow } from '@ui/button/arrow/BackArrow';

import { useAppSelector } from '@hooks/hook';

import styles from './cart.module.scss';

export const Cart: FC = () => {
  const { items } = useAppSelector(state => state.cart);

  const cartLength = items.length;

  return (
    <>
      {!cartLength ? (
        <section>
          <CartEmpty />
        </section>
      ) : (
        <section className={styles.page}>
          <BackArrow />

          <h2>Cart</h2>

          <div className={styles.items}>
            <div className={styles.wrapper}>
              {items.map(item => (
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
      )}
    </>
  );
};
