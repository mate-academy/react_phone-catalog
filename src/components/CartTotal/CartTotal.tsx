import { useProductsCart } from '../../hooks/useProductsCart';
import { getTotalPriceOfCart } from '../../utils/getTotalPriceOfCart';
import AlertDialog from '../AlertDialog/AlertDialog';

import styles from './CartTotal.module.scss';

export const CartTotal = () => {
  const { cart } = useProductsCart();
  const total = getTotalPriceOfCart(cart);

  return (
    <div className={styles.CartTotal}>
      <p className={styles.TotalPrice}>${total}</p>
      <p className={styles.Subtitle}>Total for {cart.length} items</p>

      <AlertDialog />
    </div>
  );
};
