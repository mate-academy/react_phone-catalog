import { CartItems } from '../../components/CartItems/CartItems';
import { CartTotal } from '../../components/CartTotal';
import { useAppSelector } from '../../hooks/useAppSelector';

import { ButtonBack } from '../../ui/ButtonBack';

import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { cart } = useAppSelector(state => state.cart);

  return (
    <>
      <ButtonBack />

      <h1 className={styles.Title}>
        {cart.length ? 'Cart' : 'Your cart is empty'}
      </h1>

      <section className={styles.Wrapper}>
        <CartItems />

        {cart.length !== 0 && <CartTotal />}
      </section>
    </>
  );
};
