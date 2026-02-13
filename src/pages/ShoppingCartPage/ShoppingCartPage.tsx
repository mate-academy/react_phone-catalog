import { Cart } from '../../components/Cart';
import styles from './ShoppingCartPage.module.scss';

export const ShoppingCartPage = () => {
  return (
    <div className={styles.shoppingCartPage}>
      <Cart />
    </div>
  );
};
