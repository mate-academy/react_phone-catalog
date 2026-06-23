import { Link } from 'react-router-dom';
import styles from '../ProductCard/ProductsCard.module.scss';
import { Product } from '../../types/Product';
import fav from '../../icons/header/fav.png';

type Props = {
  product: Product;
  showDiscount?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  showDiscount = true,
}) => {
  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`}>
        <img src={product.image} className={styles.image} />
      </Link>

      <Link to={`/product/${product.id}`} className={styles.title}>
        {product.name}
      </Link>

      <div className={styles.prices}>
        <span className={styles.price}>${product.price}</span>

        {showDiscount && (
          <span className={styles.fullPrice}>${product.fullPrice}</span>
        )}
      </div>

      <div className={styles.specs}>
        <div>
          <span className={styles.description}>Screen</span>
          <span>{product.screen}</span>
        </div>

        <div>
          <span className={styles.description}>Capacity</span>
          <span>{product.capacity}</span>
        </div>

        <div>
          <span className={styles.description}>RAM</span>
          <span>{product.ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.addToCart}>Add to cart</button>

        <button className={styles.favorite}>
          <img src={fav} alt="favorites" className={styles.icon} />
        </button>
      </div>
    </div>
  );
};
