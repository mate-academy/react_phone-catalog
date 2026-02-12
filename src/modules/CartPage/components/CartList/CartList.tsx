import styles from './CartList.module.scss';
import { Product } from '../../../../types/products';
import { CartItem } from '../CartItem';

type Props = {
  products: Product[];
};

export const CartList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.Checkout}>
      {products.map(product => (
        <CartItem product={product} key={product.id} />
      ))}
    </div>
  );
};
