import { Product } from '../../types/product';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import { AddToCartButton } from '../AddToCartButton';
import { AddToFavButton } from '../AddToFavButton';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.card}>
      <Link to={`/${product.category}/${product.id}`} className={styles.link}>
        <img
          src={product.images[0]}
          alt="main-photo"
          className={styles.image}
        />
        <p className={`bodytext ${styles.name}`}>{product.name}</p>
        <h3 className={styles.title}>${product.priceRegular}</h3>
      </Link>
      <div className={styles.price}></div>
      <div className={styles.info}>
        <p className={styles.category}>Screen</p>
        <p className={styles.data}>{product.screen}</p>
      </div>
      <div className={styles.info}>
        <p className={styles.category}>Capacity</p>
        <p className={styles.data}>{product.capacity}</p>
      </div>
      <div className={styles.info}>
        <p className={styles.category}>RAM</p>
        <p className={styles.data}>{product.ram}</p>
      </div>
      <div className={styles.buttons}>
        <AddToCartButton product={product} />
        <AddToFavButton product={product} />
      </div>
    </div>
  );
};
