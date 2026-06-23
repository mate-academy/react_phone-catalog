import { Link } from 'react-router-dom';
import type { Product } from '../../../types/types';
import { CartButton } from '../CartButton';
import { FavouriteButton } from '../FavouriteButton';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
  ShowDiscount?: boolean;
}

export const ProductCard = ({ product, ShowDiscount = true }: Props) => {
  return (
    <div className={styles.productCard}>
      <Link to={`/${product.category}/${product.itemId}`}>
        <img src={`/${product.image}`} alt={product.category} />
      </Link>

      <div className={styles.productCard__name}>
        <Link to={`/${product.category}/${product.itemId}`}>{product.name}</Link>
      </div>
      <div className={styles.productCard__prices}>
        <div className={styles.productCard__price}>${product.price}</div>
        {ShowDiscount && <div className={styles.productCard__fullPrice}>${product.fullPrice}</div>}
      </div>
      <div className={styles.productCard__divider}></div>
      <div className={styles.productCard__specs}>
        <div className={styles.productCard__spec}>
          Screen <div className={styles.productCard__char}>{product.screen}</div>
        </div>
        <div className={styles.productCard__spec}>
          Capacity <div className={styles.productCard__char}>{product.capacity}</div>
        </div>
        <div className={styles.productCard__spec}>
          RAM <div className={styles.productCard__char}>{product.ram}</div>
        </div>
      </div>
      <div className={styles.productCard__buttons}>
        <CartButton product={product} />
        <FavouriteButton product={product} />
      </div>
    </div>
  );
};
