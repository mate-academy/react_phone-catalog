import { useProductsCart } from '../../store/CartProvider';
import { getLengthItems } from '../../utils/getLengthItems';
import { getTotalPriceOfCart } from '../../utils/getTotalPriceOfCart';

import AlertDialog from '../AlertDialog/AlertDialog';

import styles from './CartTotal.module.scss';

export const CartTotal = () => {
  const { cart } = useProductsCart();
  const totalPrice = getTotalPriceOfCart(cart);
  const totalItems = getLengthItems(cart);

  return (
    <div className={styles.CartTotal}>
      <p className={styles.TotalPrice}>${totalPrice}</p>
      <p className={styles.Subtitle}>Total for {totalItems} items</p>

      <AlertDialog />
    </div>
  );
};
