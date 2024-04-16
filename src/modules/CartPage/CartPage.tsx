import styles from './CartPage.module.scss';
import { BackBtn } from '../../components/BackBtn/BackBtn';
import { CartItem } from '../../components/CartItem';
import { AccentBtn } from '../../components/AccentBtn';
import { useAppSelector } from '../../app/hook';
import { ErrorEmptyCart } from '../../components/Errors';
import { useMemo } from 'react';

export const CartPage = () => {
  const { cartItem } = useAppSelector(state => state.cartItems);

  const totalPrice = useMemo(() => {
    return cartItem.reduce(
      (sum, item) => sum + item.product.priceDiscount * item.quantity,
      0,
    );
  }, [cartItem]);

  return (
    <div className={styles.cart}>
      <BackBtn />

      <h1 className={styles.h1}>Cart</h1>

      {!cartItem.length && <ErrorEmptyCart />}

      {!!cartItem.length && (
        <div className={styles.cartContent}>
          <div className={styles.cartItemsWrap}>
            {cartItem.map(item => (
              <div className={styles.cartItems} key={item.id}>
                <CartItem cartItem={item} />
              </div>
            ))}
          </div>

          <div className={styles.cartCheckout}>
            <span className={styles.cartTotalPrice}>{`$${totalPrice}`}</span>

            <span className={styles.cartTotalText}>
              Total for {cartItem.length} items
            </span>

            <span className={styles.cartDivider}></span>

            <span className={styles.cartBtn}>
              <AccentBtn text="Checkout" onClick={() => {}} />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
