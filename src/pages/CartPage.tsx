import { Cart } from '../components/Cart';
import { Back } from '../components/Back';
import styles from '../components/Cart/Cart.module.scss';

export const CartPage = () => {
  return (
    <>
      <div className={styles.btnBack}>
        <Back />
      </div>

      <Cart />
    </>
  );
};
