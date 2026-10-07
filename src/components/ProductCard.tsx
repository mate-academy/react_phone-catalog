import { Link } from 'react-router-dom';
import { Product } from '../types/Product';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const discount = Math.round(
    ((product.fullPrice - product.price) / product.fullPrice) * 100,
  );

  return (
    <article className={styles.card}>
      <Link to={`/product/${product.itemId}`} className={styles.imageLink}>
        <img src={product.image} alt={product.name} className={styles.image} />
      </Link>

      <Link to={`/product/${product.itemId}`} className={styles.name}>
        {product.name}
      </Link>

      <div className={styles.prices}>
        <span className={styles.price}>${product.price}</span>

        {product.fullPrice > product.price && (
          <>
            <span className={styles.fullPrice}>${product.fullPrice}</span>

            <span className={styles.discount}>-{discount}%</span>
          </>
        )}
      </div>

      <div className={styles.specs}>
        <div>
          <span>Screen</span>
          <span>{product.screen}</span>
        </div>

        <div>
          <span>Capacity</span>
          <span>{product.capacity}</span>
        </div>

        <div>
          <span>RAM</span>
          <span>{product.ram}</span>
        </div>
      </div>
    </article>
  );
};
