import { Product } from '../../../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductList.module.scss';

type Props = {
  products: Product[];
  currentIndex: number;
  step: number;
};

export const ProductList: React.FC<Props> = ({
  products,
  currentIndex,
  step,
}) => {
  return (
    <div
      className={styles.sliderTrack}
      style={{
        transform: `translateX(-${currentIndex * step}px)`,
      }}
    >
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
