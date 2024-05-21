import { CartItems } from './CartItems/CartItems';
import { CheckoutInformation } from './CheckoutInformation/CheckoutInformation';
import styles from './Checkout.module.scss';

export const Checkout = () => {
  return (
    <div className={styles.checkout}>
      <div className={styles.checkout__wrapper}>
        <CartItems />
        <CheckoutInformation />
      </div>
    </div>
  );
};
