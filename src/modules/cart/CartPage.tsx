import { CartContent } from './CartContent';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  return (
    <div className={styles.conatiner}>
      <div>
        <CartContent />
      </div>
    </div>
  );
};
