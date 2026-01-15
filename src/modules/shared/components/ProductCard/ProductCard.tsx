import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
  showDiscount?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  showDiscount = false,
}) => {
  return (
    <div className={styles.card}>
      <a href="#" className={styles.productImgLink}>
        <img src={product.image} className={styles.productImg}></img>
      </a>
      <p className={styles.productName}>{product.name}</p>
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
        <button className={styles.buttonAdd}>Add to cart</button>
        <button className={styles.buttonIcon}>
          <img src="/img/icons/heart.png" className={styles.iconImg}></img>
        </button>
      </div>
    </div>
  );
};
