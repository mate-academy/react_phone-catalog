import { CartItems } from '../../components/CartItems/CartItems';
import { CartTotal } from '../../components/CartTotal';
import { useProductsCart } from '../../hooks/useProductsCart';
import { ButtonBack } from '../../ui/ButtonBack';

import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { cart } = useProductsCart();

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
