import styles from './ProductOverview.module.scss';
import { Product } from '../../../../shared/types/Product/Product';
import { ProductDetails } from '../ProductDetails/ProductDetails';
import { ProductOptions } from '../ProductOptions/ProductOptions';

type Props = {
  product: Product;
};

export const ProductOverview: React.FC<Props> = ({ product }) => {
  return (
    <section className={styles.productOverview}>
      <ProductDetails product={product} />
      <ProductOptions product={product} />
    </section>
  );
};
