import classNames from 'classnames';
import styles from './CartPage.module.scss';
import { BackLink } from '../shared/components/BackLink';
import { CartList } from './components/CartList';
import { useCart } from '@/hooks/useCart';
import { Summary } from './components/Summary';
import { Message } from '../shared/components/Message';

export const CartPage = () => {
  const {
    cart: { items, total },
  } = useCart();

  return (
    <div className={classNames(styles.wrapper, 'container')}>
      <BackLink />

      <h1 className={styles.title}>Cart</h1>

      {items.length === 0 && (
        <Message
          message="Cart is empty"
          className={styles.emptyMessage}
          imgPath="img/cart-is-empty.png"
        />
      )}

      {items.length !== 0 && (
        <>
          <section className={styles.cartList}>
            <CartList items={items} />
          </section>
          <Summary
            totalItems={items.length}
            totalPrice={total}
            className={styles.summary}
          />
        </>
      )}
    </div>
  );
};
