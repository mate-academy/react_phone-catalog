import { useProductsCart } from '../../hooks/useProductsCart';
import { PurchaseButton } from '../../ui/PurchaseButton';
import { getTotalPriceOfCart } from '../../utils/utils';
import styles from './CartTotal.module.scss';

export const CartTotal = () => {
  const { cart } = useProductsCart();

  const total = getTotalPriceOfCart(cart);

  return (
    <div className={styles.CartTotal}>
      <p className={styles.TotalPrice}>${total}</p>
      <p className={styles.Subtitle}>Total for {cart.length} items</p>

      <PurchaseButton>Checkout</PurchaseButton>
    </div>
  );
};
