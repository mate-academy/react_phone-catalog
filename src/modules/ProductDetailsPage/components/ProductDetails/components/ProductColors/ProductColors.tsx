import { ProductDetails } from '@/types/ProductDetails';
import styles from './ProductColors.module.scss';
import { ColorButton } from '../../../ColorButton';

interface Props {
  product: ProductDetails;
}

export const ProductColors = ({ product }: Props) => {
  return (
    <div className={styles.productColors}>
      {product.colorsAvailable.map(color => {
        const formattedColor = color.split(' ').join('').toLowerCase();

        const path = [
          product.namespaceId,
          product.capacity.toLowerCase(),
          formattedColor,
        ].join('-');

        return (
          <ColorButton
            key={formattedColor}
            to={`/${product.category}/${path}`}
            color={formattedColor}
          />
        );
      })}
    </div>
  );
};
