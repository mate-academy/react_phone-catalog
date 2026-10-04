import { CartItem } from '@/shared/types/CartItem.js';
import styles from './CatrItems.module.scss';
import { CartProduct } from '../CartItem/CartProduct';

type Props = {
  products: CartItem[];
};

export const CartItems: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.items}>
      {products.map(item => (
        <CartProduct key={item.id} product={item.product} />
      ))}
    </div>
  );
};
