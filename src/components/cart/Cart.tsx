import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './cart.module.scss';

import { CartEmpty } from './cart-empty/CartEmpty';
import { CartItem } from './cart-item/CartItem';
import { CartSummary } from './cart-summary/CartSummary';
import { ArrowLeftIcon } from '@ui/icon/ArrowLeftIcon';
import { useAppSelector } from '@hooks/hook';

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
          {/* TODO: Edit correct link */}
          <Link to={'*'} className={styles.back}>
            <ArrowLeftIcon />
            <span>Back</span>
          </Link>

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
