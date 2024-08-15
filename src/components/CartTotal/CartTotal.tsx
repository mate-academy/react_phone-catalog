import { useAppSelector } from '../../hooks/useAppSelector';
import { getLengthItems } from '../../utils/getLengthItems';
import { getTotalPriceOfCart } from '../../utils/getTotalPriceOfCart';

import AlertDialog from '../AlertDialog/AlertDialog';

import styles from './CartTotal.module.scss';

export const CartTotal = () => {
  // const { cart } = useProductsCart();
  const { cart } = useAppSelector(state => state.cart);
  const totalPrice = getTotalPriceOfCart(cart);
  const totalItems = getLengthItems(cart);

  return (
    <div className={styles.cartTotal}>
      <p className={styles.totalPrice}>${totalPrice}</p>
      <p className={styles.subtitle}>Total for {totalItems} items</p>

      <AlertDialog />
    </div>
  );
};
