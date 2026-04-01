import { CartItem } from '../CartItem/CartItem';
import { Product } from '../ProductCarousel';

import styles from './CartCatalog.module.scss';
type Props = {
  products: Product[];
  handleUpdateAmount: (productId: string, newAmount: number) => void;
  handleRemoveItem: (productId: string) => void;
};

export const CartCatalog = ({
  products,
  handleUpdateAmount,
  handleRemoveItem,
}: Props) => {
  return (
    <>
      <div className={styles.catalog}>
        {products.map(product => (
          <CartItem
            key={product.id}
            product={product}
            amount={product.amount || 1}
            handleUpdateAmount={handleUpdateAmount}
            handleRemoveItem={handleRemoveItem}
          />
        ))}
      </div>
    </>
  );
};
