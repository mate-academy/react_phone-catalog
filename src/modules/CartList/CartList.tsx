import { CartItemType } from '../../types/CartItemType';
import { CartItem } from '../CartItem';
import styles from './CartList.styles.module.scss';

type Props = {
  items: CartItemType[];
};

export const CartList: React.FC<Props> = ({ items }) => {
  return (
    <div className={styles.cartItems}>
      {items.map(item => (
        <CartItem key={item.product.itemId} item={item} />
      ))}
    </div>
  );
};
