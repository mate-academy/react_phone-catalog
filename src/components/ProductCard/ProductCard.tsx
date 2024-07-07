import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductCardButtons } from '../ProductCardButtons/ProductCardButtons';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { name, capacity, fullPrice, price, image, screen, ram } = product;

  return (
    <div className={styles.card}>
      <Link to={`/products/${product.itemId}`} className={styles.cardLink}>
        <div className={styles.imageContainer}>
          <img src={image} alt="productimage" className={styles.image} />
        </div>

        <p className={styles.name}>{name}</p>

        <div className={styles.priceWrapper}>
          <p className={styles.fullPrice}>{`$${fullPrice}`}</p>
          <p className={styles.price}>{`$${price}`}</p>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.techWrapper}>
          <p className={styles.techChars}>Screen</p>
          <p className={styles.techCharInfo}>{screen}</p>
        </div>

        <div className={styles.techWrapper}>
          <p className={styles.techChars}>Capacity</p>
          <p className={styles.techCharInfo}>{capacity}</p>
        </div>

        <div className={styles.techWrapper}>
          <p className={styles.techChars}>RAM</p>
          <p className={styles.techCharInfo}>{ram}</p>
        </div>
      </Link>

      <ProductCardButtons product={product} />
    </div>
  );
};
