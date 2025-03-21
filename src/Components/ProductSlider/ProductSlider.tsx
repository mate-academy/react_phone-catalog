import { Product } from '../../types/product';
import { ProductDetailsPage } from '../ProductDetailsPage/ProductDetailsPage';
import styles from './ProductSlider.module.scss';

type Props = {
  items: Product[];
  offset: number;
  discount: boolean;
};

export const ProductSlider: React.FC<Props> = ({ items, offset, discount }) => {
  return (
    <div className={styles.container}>
      {items.map(item => (
        <ProductDetailsPage
          key={item.id}
          item={item}
          offset={offset}
          discount={discount ? item.priceRegular : undefined}
        />
      ))}
    </div>
  );
};
