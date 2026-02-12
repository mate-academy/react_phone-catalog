import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';
import { ButtonAddToCart } from '../ButtonAddToCart';
import { ButtonAddToFavorites } from '../ButtonAddToFavorites';
import { asset } from '../../utils/asset';

type Props = {
  product: Product;
  showDiscount?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  showDiscount = false,
}) => {
  const onClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.card}>
      <Link
        to={`/product/${product.itemId}`}
        className={styles.productImgLink}
        onClick={onClick}
      >
        <div className={styles.productImgBlock}>
          <img
            src={asset('/' + product.image)}
            className={styles.productImg}
          ></img>
        </div>
        <p className={styles.productName}>{product.name}</p>
      </Link>
      <div className={styles.prices}>
        <p className={styles.price}>${product.price}</p>
        {showDiscount && (
          <p className={styles.fullPrice}>${product.fullPrice}</p>
        )}
      </div>
      <div className={styles.characteristics}>
        <div className={styles.characteristic}>
          <p className={styles.cName}>Screen</p>
          <p className={styles.cValue}>{product.screen}</p>
        </div>

        <div className={styles.characteristic}>
          <p className={styles.cName}>Capacity</p>
          <p className={styles.cValue}>{product.capacity}</p>
        </div>

        <div className={styles.characteristic}>
          <p className={styles.cName}>RAM</p>
          <p className={styles.cValue}>{product.ram}</p>
        </div>
      </div>
      <div className={styles.buttons}>
        <ButtonAddToCart product={product} />

        <ButtonAddToFavorites product={product} />
      </div>
    </div>
  );
};
