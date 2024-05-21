import { useAppSelector } from '../../../../hooks/hooks';
import { CartItem } from './CartItem/CartItem';
import styles from './CartItems.module.scss';

export const CartItems = () => {
  const products = useAppSelector(state => state.cart);

  return (
    <div className={styles.cartItems}>
      <div className={styles.cartItems__wrapper}>
        {products.items.map(product => (
          <CartItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
