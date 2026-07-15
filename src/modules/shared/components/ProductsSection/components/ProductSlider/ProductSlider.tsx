import styles from './ProductSlider.module.scss';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../../../ProductCard';

interface Props {
  products: Product[];
  emblaRef: (node: HTMLDivElement | null) => void;
}

export const ProductSlider: React.FC<Props> = ({ products, emblaRef }) => {
  return (
    <div className={styles.carousel}>
      <div className={styles.carousel__wrapper} ref={emblaRef}>
        <ul className={styles.carousel__collection}>
          {products.length > 0 ? (
            products.map(product => (
              <li className={styles.carousel__item} key={product.id}>
                <ProductCard product={product} />
              </li>
            ))
          ) : (
            <div className={styles.carousel__item}> Models not found</div>
          )}
        </ul>
      </div>
    </div>
  );
};
