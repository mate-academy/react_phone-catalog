import { ProductCard } from '../ProductCard/ProductCard';
import { ProductFull } from '../../../types/Product_full';
import styles from './ProductSlider.module.scss';

type Props = {
  products: ProductFull[];
  index: number;
  width: number;
};

export const ProductSlider: React.FC<Props> = ({ index, width, products }) => {
  return (
    <div className={styles.productSlider}>
      <div
        className={styles.productSlider__track}
        style={{
          transition: 'transform 0.4s ease',
          transform: `translateX(-${index * (width + 16)}px)`,
        }}
      >
        {products.map(product => (
          <div key={product.id} className={styles.productSlider__item}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
