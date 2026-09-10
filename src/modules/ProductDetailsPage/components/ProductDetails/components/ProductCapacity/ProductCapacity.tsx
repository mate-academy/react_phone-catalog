import { ProductDetails } from '@/types/ProductDetails';
import styles from './ProductCapacity.module.scss';
import { CapacityButton } from '../../../CapacityButton';

interface Props {
  product: ProductDetails;
}

export const ProductCapacity = ({ product }: Props) => {
  return (
    <div className={styles.productCapacity}>
      {product.capacityAvailable.map(capacity => {
        const path = [
          product.namespaceId,
          capacity.toLowerCase(),
          product.color.toLowerCase(),
        ].join('-');

        return (
          <CapacityButton
            key={capacity}
            to={`/${product.category}/${path}`}
            value={capacity}
          />
        );
      })}
    </div>
  );
};
