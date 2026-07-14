import { CartItem } from '../../../shared/store/CartContext';
import styles from './CartList.module.scss';
import { CartCard } from './components/CartCard';

interface Props {
  cartItems: CartItem[];
}

export const CartList: React.FC<Props> = ({ cartItems }) => {
  return (
    <ul className={styles['cart-list']}>
      {cartItems.map(item => (
        <CartCard item={item} key={item.product.itemId} />
      ))}
    </ul>
  );
};
